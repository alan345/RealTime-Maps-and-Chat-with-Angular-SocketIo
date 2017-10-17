var express = require('express'),
    router  = express.Router(),
    config  = require('../config/config'),
    User    = require('../models/user.model'),
    Log    = require('../models/log.model'),
    Form    = require('../models/form.model'),
    fs      = require('fs'),
    jwt     = require('jsonwebtoken'),
    nameObject = 'log'

// this process does not hang the nodejs server on error
process.on('uncaughtException', function (err) {
  console.log(err)
})


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




router.put('/:id', function (req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({ title: 'No rights', error: {message: 'No rights'} })
  }
  Log.findById(({_id: req.params.id}), function (err, item) {
    if (err) {
      return res.status(404).json({
        message: '',
        err: err
      })
    } else {

        item.name = req.body.name
        item.description = req.body.description
        // item.vendors = req.body.vendors
        item.forms = req.body.forms




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
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({ title: 'No rights', error: {message: 'No rights'} })
  }
  if(!req.user.ownerCompanies.length) {
    return res.status(404).json({
      message: 'You must belong to a companie',
      err: ''
    })
  }
   console.log(req.user.companies)
  //var Log = new Log(req.body)
  var log = new Log(req.body)
  log.ownerCompanies = req.user.ownerCompanies
  log.owner = req.user._id
  log.save(function (err, result) {
    if (err) {
      console.log(err)
      return res.status(403).json({
        title: 'There was an issue',
        error: {message: 'Error'}
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
  var itemsPerPage = 10
  var currentPage = Number(req.params.page)
  var pageNumber = currentPage - 1
  var skip = (itemsPerPage * pageNumber)

// let rights = new Date(JSON.parse(JSON.stringify(req.query.start)))

  let searchQuery = {}

  searchQuery['ownerCompanies'] = req.user.ownerCompanies





  if(req.query.start)
    searchQuery['createdAt'] = {
      "$gte":  new Date(JSON.parse(req.query.start)),
      "$lt":  new Date(JSON.parse(req.query.end))
    }






  if(req.query.search)
    searchQuery['name'] = new RegExp(req.query.search, 'i')


  // if(req.query.start)
  //   searchQuery['createdAt']['$lt'] = new Date(JSON.parse(req.query.start))

  if(req.query.projectId)
    searchQuery['projects'] = mongoose.Types.ObjectId(req.query.projectId)
  if(req.query.categorieId)
    searchQuery['categories'] = mongoose.Types.ObjectId(req.query.categorieId)
  if(req.query.userId)
    searchQuery['users'] = mongoose.Types.ObjectId(req.query.userId)
  if(req.query.documentId)
    searchQuery['documents'] = mongoose.Types.ObjectId(req.query.documentId)
  if(req.query.stratId)
    searchQuery['strats'] = mongoose.Types.ObjectId(req.query.stratId)
  if(req.query.missionId)
    searchQuery['missions'] = mongoose.Types.ObjectId(req.query.missionId)

    console.log(searchQuery)

  Log
  .find(searchQuery)
  .sort('-createdAt')
  .populate({path: 'users', model: 'User'})
  .populate({path: 'missions', model: 'Mission'})
  .populate({path: 'strats', model: 'Strat'})
  .populate({path: 'documents', model: 'Document'})
  .limit(itemsPerPage)
  .skip(skip)
  .exec(function (err, item) {
    if (err) {
      return res.status(404).json({
        message: 'No results',
        err: err
      })
    } else {
      Log
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




router.get('/:id', function (req, res, next) {
  Log.findById((req.params.id), function (err, obj) {
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

    Log
    .findById({_id: req.params.id})
    .populate('vendors')
    .populate('forms')
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
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({ title: 'No rights', error: {message: 'No rights'} })
  }
  Log.findById((req.params.id), function (err, item) {
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
