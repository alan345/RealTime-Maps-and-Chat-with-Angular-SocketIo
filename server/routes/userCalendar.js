var express = require('express'),
  router = express.Router(),
  config = require('../config/config'),
  User = require('../models/user.model'),
  UserCalendar = require('../models/userCalendar.model'),
  fs = require('fs'),
  jwt = require('jsonwebtoken'),
  shared = require('./shared.js'),
  nameObject = 'userCalendar'

// this process does not hang the nodejs server on error
process.on('uncaughtException', function(err) {
  console.log(err)
})

// Checking if user is authenticated or not, security middleware
router.use('/', function(req, res, next) {
  var token = req.headers['authorization']
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      return res.status(401).json({message: 'Authentication failed', error: err})
    }
    if (!decoded) {
      return res.status(404).json({
        title: 'Authentication Failed',
        error: {
          message: 'Authentication failed, malformed jwt'
        }
      })
    }
    if (decoded) {
      User.findById(decoded.user._id).populate({path: 'rights', model: 'Right'}).exec(function(err, doc) {
        if (err) {
          return res.status(500).json({message: 'Fetching user failed', err: err})
        }
        if (!doc) {
          return res.status(404).json({
            title: 'User not found',
            error: {
              message: 'The user was not found'
            }
          })
        }
        if (!shared.isCurentUserHasAccess(doc, 'userCalendar', 'read')) {
          return res.status(404).json({
            title: 'No rights',
            error: {
              message: 'No rights'
            }
          })
        }
        if (doc) {
          req.user = doc
          next()
        }
      })
    }
  })
})

//update
router.put('/:id', function(req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({
      title: 'No rights',
      error: {
        message: 'No rights'
      }
    })
  }
  UserCalendar.findById(({_id: req.params.id}), function(err, item) {
    if (err) {
      return res.status(404).json({message: '', err: err})
    } else {

      item.title = req.body.title,
      item.url = req.body.url,
      item.start = req.body.start,
      item.end = req.body.end,
      item.details = req.body.details,
      // item.user = req.body.user,
      item.color = req.body.color,
      item.clients = req.body.clients,
      item.assignedTos = req.body.assignedTos,
      item.projects = req.body.projects,

      item.save(function(err, result) {
        if (err) {
          return res.status(404).json({message: 'There was an error, please try again', err: err})
        }
        shared.postNotification(req, 'userCalendar')
        .then(notification => {
          res.status(201).json({message: 'Updated successfully', obj: result})
        })
        .catch(error=>{return res.status(404).json({message: 'There was an error, please try again', err: err})})

      })

    }
  })
})

router.post('/', function(req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({
      title: 'No rights',
      error: {
        message: 'No rights'
      }
    })
  }
  if (!req.user.ownerCompanies.length) {
    return res.status(404).json({message: 'You must belong to a companie', err: ''})
  }


  req.body.projects.forEach(project => {
    req.body.clients = project.clients
    req.body.assignedTos = project.assignedTos
  })

  //console.log(req.body)
  //var UserCalendar = new UserCalendar(req.body)
  var userCalendar = new UserCalendar(req.body)
  userCalendar.ownerCompanies = req.user.ownerCompanies
  // console.log(userCalendar)

  userCalendar.save(function(err, result) {
    if (err) {
      console.log(err)
      return res.status(403).json({
        title: 'There was an issue',
        error: {
          message: 'Error'
        }
      })
    }
    shared.postNotification(req, 'userCalendar').then(notification => {
      res.status(200).json({message: 'Registration Successfull', obj: result})
    })
    .catch(error=>{return res.status(404).json({message: 'There was an error, please try again', err: err})})
  })
})

// get all forms from database
router.get('/page/:page', function(req, res, next) {
  var itemsPerPage = 15
  var currentPage = Number(req.params.page)
  var pageNumber = currentPage - 1
  var skip = (itemsPerPage * pageNumber)

  let searchQuery = {
    start: {
      "$gt": req.query.startDate
    },
    end: {
      "$lt": req.query.endDate
    }
  }
  searchQuery['ownerCompanies'] = req.user.ownerCompanies

  // if (req.query.typeUser)
  //   searchQuery['users.type'] = req.query.typeUser


  if (req.query.userSearch)
    searchQuery['clients'] = mongoose.Types.ObjectId(req.query.userSearch)

  // if (req.query.projectSearch)
  //   searchQuery['projects'] = mongoose.Types.ObjectId(JSON.parse(req.query.projectSearch)._id)

  if (req.query.projectSearch)
    searchQuery['projects'] = mongoose.Types.ObjectId(req.query.projectSearch)



  if (req.query.search)
    searchQuery['name'] = new RegExp(req.query.search, 'i')

  UserCalendar
  .find(searchQuery)
  .sort('-createdAt')
  .populate({path: 'assignedTos', model: 'User'})
  .populate({path: 'clients', model: 'User'})
  // .where('users.type').in(req.query.userSearch)
  .populate({path: 'projects', model: 'Project'})
  .limit(itemsPerPage).skip(skip)
  .exec(function(err, item) {
    if (err) {
      return res.status(404).json({message: 'No results', err: err})
    } else {
      UserCalendar.find(searchQuery).count().exec(function(err, count) {

        if (req.query.typeUser) {
          var itemFiltered = []
          item.forEach(event => {
            event.assignedTos.forEach(user => {
              if (user.typeUsers.length) {
                if (user.typeUsers[0] === req.query.typeUser) {
                  itemFiltered.push(event)
                }
              }
            })
          })
          item = itemFiltered
          count = item.length
        }

        res.status(200).json({
          paginationData: {
            totalItems: count,
            currentPage: currentPage,
            itemsPerPage: itemsPerPage
          },
          data: item
        })
      })
    }
  })
})

// getting user forms to display them on front end
router.get('/:id', function(req, res, next) {
  UserCalendar.findById((req.params.id), function(err, obj) {
    if (err) {
      return res.status(500).json({message: 'An error occured', err: err})
    }
    if (!obj) {
      return res.status(404).json({
        title: 'No obj found',
        error: {
          message: 'Obj not found!'
        }
      })
    }

    UserCalendar.findById({_id: req.params.id})
    .populate({path: 'users', model: 'User'})
    .populate({path: 'projects', model: 'Project'})
    // .populate({path: 'quotes', model: 'Quote'})
    .exec(function(err, item) {
      if (err) {
        return res.status(404).json({message: '', err: err})
      } else {
        res.status(200).json({message: 'Success', item: item})
      }
    })
  })
})

router.delete('/:id', function(req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({
      title: 'No rights',
      error: {
        message: 'No rights'
      }
    })
  }
  UserCalendar.findById((req.params.id), function(err, item) {
    if (err) {
      return res.status(500).json({message: 'An error occured', err: err})
    }
    if (!item) {
      return res.status(404).json({
        title: 'No form found',
        error: {
          message: 'Form not found!'
        }
      })
    }

    // deleting the form from the database
    item.remove(function(err, result) {
      if (err) {
        return res.status(500).json({title: 'An error occured', error: err})
      }
      res.status(200).json({message: 'Item is deleted', obj: result})
    })
  })
})

module.exports = router
