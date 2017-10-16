var express = require('express'),
    router  = express.Router(),
    config  = require('../config/config'),
    User    = require('../models/user.model'),
    Task    = require('../models/task.model'),
    Form    = require('../models/form.model'),
    fs      = require('fs'),
    jwt     = require('jsonwebtoken'),
    nameObject = 'task'

// this process does not hang the nodejs server on error
process.on('uncaughtException', function (err) {
  console.log(err)
})

// Checking if user is authenticated or not, security middleware
router.use('/', function (req, res, next) {
  var token = req.headers['authorization']
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        message: 'Authentication failed',
        error: err
      })
    }
    if (!decoded) {
      return res.status(404).json({
        title: 'Authentication Failed',
        error: {message: 'Authentication failed, malformed jwt'}
      })
    }
    if (decoded) {
      User
      .findById(decoded.user._id)
      .populate({ path: 'rights', model: 'Right'})
      .exec(function (err, doc) {
        if (err) {
          return res.status(500).json({
            message: 'Fetching user failed',
            err: err
          })
        }
        if (!doc) {
          return res.status(404).json({
            title: 'User not found',
            error: {message: 'The user was not found'}
          })
        }
        if(!shared.isCurentUserHasAccess(doc, nameObject, 'read')) {
          return res.status(404).json({
            title: 'No rights',
            error: {message: 'No rights'}
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
router.put('/:id', function (req, res, next) {
  if(!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({ title: 'No rights', error: {message: 'No rights'} })
  }
  Task.findById(({_id: req.params.id}), function (err, item) {
    if (err) {
      return res.status(404).json({
        message: '',
        err: err
      })
    } else {
      //console.log(req.body)
        item.users = req.body.users
        item.dateTask = req.body.dateTask
        item.description = req.body.description
        item.name = req.body.name
        item.dateTask = req.body.dateTask
        item.status = req.body.status
        item.title = req.body.title

        item.save(function (err, result) {
          if (err) {
            return res.status(404).json({
              message: 'There was an error, please try again',
              err: err
            })
          }
          res.status(201).json({
            message: 'Updated successfully',
            obj: result
          })
        })

    }
  })
})

router.post('/', function (req, res, next) {
  if(!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({ title: 'No rights', error: {message: 'No rights'} })
  }
  if(!req.user.ownerCompanies.length) {
    return res.status(404).json({
      message: 'You must belong to a companie',
      err: ''
    })
  }


  var task = new Task(req.body)

  task.ownerCompanies = req.user.ownerCompanies

  task.save(function (err, result) {
    if (err) {

      return res.status(403).json({
        title: 'There was an issue',
        error: err
      })
    }
    res.status(200).json({
      message: 'Registration Successfull',
      obj: result
    })
  })
})




// get all forms from database
router.get('/page/:page', function (req, res, next) {
  var itemsPerPage = 15
  var currentPage = Number(req.params.page)
  var pageNumber = currentPage - 1
  var skip = (itemsPerPage * pageNumber)

  let searchQuery = {}
  searchQuery['ownerCompanies'] = req.user.ownerCompanies

  if (req.query.myTasks === 'true')
    searchQuery['assignedTos'] = mongoose.Types.ObjectId(req.user._id)
    // aggregate.push({
    //   $match: {
    //     'bucketTasks.tasks.assignedTos': mongoose.Types.ObjectId(req.user._id)
    //   }
    // })

  if(req.query.search)
    searchQuery['details.name'] = new RegExp(req.query.search, 'i')


  if(req.query.userId)
    searchQuery['clients'] = mongoose.Types.ObjectId(req.query.userId)


  Task
  .find(searchQuery)
  .sort('-createdAt')
  .populate({path: 'projects', model: 'Project'})
  .populate({ path: 'users', model: 'User'})

  // .populate({path: 'quotes', model: 'Quote'})
  // .populate(
  //   {
  //     path: 'bucketTasks.tasks.assignedTos',
  //     model: 'User',
  //   })
  .limit(itemsPerPage)
  .skip(skip)
  .exec(function (err, item) {
    if (err) {
      return res.status(404).json({
        message: 'No results',
        err: err
      })
    } else {
      Task
      .find(searchQuery)
      .count()
      .exec(function (err, count) {
      res.status(200).json({
          paginationData : {
            totalItems: count,
            currentPage : currentPage,
            itemsPerPage : itemsPerPage
          },
          data: item
        })
      })
    }
  })
})




// getting user forms to display them on front end
router.get('/:id', function (req, res, next) {


  Task.findById((req.params.id), function (err, obj) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured',
        err: err
      })
    }
    if (!obj) {
      return res.status(404).json({
        title: 'No obj found',
        error: {message: 'Obj not found!'}
      })
    }


    Task
    .findById({_id: req.params.id})
    .populate({path: 'projects', model: 'Project'})
    .populate({ path: 'users', model: 'User'})
    // .populate({path: 'forms', model: 'Form'})
    // .populate({path: 'assignedTos', model: 'User'})
    // .populate(
    //   {
    //     path: 'bucketTasks.tasks.assignedTos',
    //     model: 'User',
    //   })
    .exec(function (err, item) {
      if (err) {
        return res.status(404).json({
          message: '',
          err: err
        })
      } else {
        res.status(200).json({
          message: 'Success',
          item: item
        })
      }
    })
  })
})





router.delete('/:id', function (req, res, next) {
  if(!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({ title: 'No rights', error: {message: 'No rights'} })
  }
  Task.findById((req.params.id), function (err, item) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured',
        err: err
      })
    }
    if (!item) {
      return res.status(404).json({
        title: 'No form found',
        error: {message: 'Form not found!'}
      })
    }

    // deleting the form from the database
    item.remove(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        })
      }
      res.status(200).json({
        message: 'Item is deleted',
        obj: result
      })
    })
  })
})



module.exports = router
