var express = require('express'),
  router = express.Router(),
  config = require('../config/config'),
  User = require('../models/user.model'),
  Quote = require('../models/quote.model'),

  fs = require('fs'),
  jwt = require('jsonwebtoken'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  shared = require('./shared.js'),
  nameObject = 'quote'

// this process does not hang the nodejs server on error
process.on('uncaughtException', function (err) {
  console.log(err);
});

router.get('/:id', function (req, res, next) {

  Quote.findById((req.params.id), function (err, obj) {
    if (err) {
      return res.status(500).json({message: 'An error occured', err: err})
    }
    if (!obj) {
      return res.status(404).json({
        title: 'No form found',
        error: {
          message: 'Form not found!'
        }
      })
    }

    // let findQuery = {}
    // findQuery['_id'] = req.params.id
    Quote
    .findById({_id: req.params.id})
    .populate({
      path: 'projects',
      model: 'Project',
      populate: {
        path: 'assignedTos',
        model: 'User',
      }
    })
    .populate({path: 'signature.users', model: 'User'})
    .populate({path: 'clients', model: 'User'})
    .populate({path: 'devisDetails.bucketCategories.categorieInit', model: 'Categorie'})
    .exec(function (err, item) {
      if (err) {
        return res.status(404).json({message: '', err: err})
      }
      if (!item) {
        return res.status(404).json({
          title: 'No obj found',
          error: {
            message: 'Obj not found!'
          }
        })
      } else {
        res.status(200).json({message: 'Success', item: item});
      }
    })
  })
})

// Checking if user is authenticated or not, security middleware
router.use('/', function (req, res, next) {
  var token = req.headers['authorization'];
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(401).json({message: 'Authentication failed', error: err})
    }
    if (!decoded) {
      return res.status(404).json({
        title: 'Authentication Failed',
        error: {
          message: 'Authentication failed, malformed jwt. Please login or refresh Page'
        }
      });
    }
    if (decoded) {
      User.findById(decoded.user._id).populate({path: 'rights', model: 'Right'}).exec(function (err, doc) {
        if (err) {
          return res.status(500).json({message: 'Fetching user failed', err: err});
        }
        if (!doc) {
          return res.status(404).json({
            title: 'User not found',
            error: {
              message: 'The user was not found'
            }
          })
        }
        if(!shared.isCurentUserHasAccess(doc, 'quote', 'read')) {
          return res.status(404).json({
            title: 'No rights',
            error: {
              message: 'No rights'
            }
          })
        }
        if (doc) {
          req.user = doc;
          next();
        }
      })
    }
  })
});

router.get('/graph/:year', function (req, res, next) {
  // let searchQuery = {}
  // searchQuery['ownerCompanies'] = req.user.ownerCompanies

  let dateBegin = req.params.year * 1 + '-01-01'
  let dateEnd = req.params.year * 1 + 1 + '-01-01'


  // if (req.query.search)
  //   searchQuery['details.name'] = new RegExp(req.query.search, 'i')
  //
  // if (req.query.idQuote)
  //   searchQuery['quotes'] = mongoose.Types.ObjectId(req.query.idQuote)

  let aggregate = {
    'detail.dateQuote.issueDate': {
      '$gte': new Date(dateBegin),
      '$lt': new Date(dateEnd)
    }
  }

  aggregate.ownerCompanies = req.user.ownerCompanies


  Quote.aggregate({
    $match: aggregate
  }, {
    $group: {
      _id: {
        year: {
          $year: "$detail.dateQuote.issueDate"
        },
        month: {
          $month: "$detail.dateQuote.issueDate"
        },
        //  day: { $dayOfMonth : "$datePaiement" }
      },
      amountTotal: {
        $sum: "$priceQuote.priceQuoteWithoutTaxes"
      }
    }
  }).exec(function (err, item) {
    if (err) {
      return res.status(404).json({message: '', err: err})
    } else {
      res.status(200).json({message: 'Success', item: item})
    }
  })

})

//update
router.put('/:id', function (req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({
      title: 'No rights',
      error: {
        message: 'No rights'
      }
    })
  }
  Quote.findById(({_id: req.params.id}), function (err, item) {
    if (err) {
      return res.status(404).json({message: '', err: err})
    }

    item.clients = req.body.clients
    item.name = req.body.name
    item.typeQuote = req.body.typeQuote
    // item.ownerQuotes = req.body.ownerQuotes
    item.forms = req.body.forms
    item.categories = req.body.categories
    item.projects = req.body.projects
    item.devisDetails = req.body.devisDetails
    item.priceQuote = req.body.priceQuote
    item.signature = req.body.signature
    item.detail = req.body.detail
    item.statusQuote = req.body.statusQuote


    item.save(function (err, result) {
      if (err) {
        return res.status(404).json({message: 'There was an error, please try again', err: err});
      }
      res.status(201).json({message: '', obj: result});
    });
  })
});



//update
router.put('/:id/signature', function (req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write'))
    return res.status(404).json({ title: 'No rights', error: { message: 'No rights' }})

  Quote.findById(({_id: req.params.id}), function (err, item) {
    if (err) { return res.status(404).json({message: '', err: err}) }
    item.signature = req.body.signature
    item.save(function (err, result) {
      if (err) { return res.status(404).json({message: 'There was an error, please try again', err: err}) }
      shared.postNotification(req, 'quote')
      .then(()=> {
        res.status(201).json({message: '', obj: result});
      })
      .catch((error) => {
        return res.status(404).json({message: 'There was an error, please try again', err: err})
      })
    });
  })
});



router.post('/', function (req, res, next) {
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
  var quote = new Quote(req.body);
  quote.ownerCompanies = req.user.ownerCompanies
  quote.save(function (err, result) {
    if (err) {
      return res.status(403).json({
        title: 'There was an issue',
        error: {
          message: 'The email you entered already exists'
        }
      });
    }
    res.status(200).json({message: 'Registration Successfull', obj: result})
  })
});

// get all forms from database
router.get('/page/:page', function (req, res, next) {
  var itemsPerPage = 5
  var currentPage = Number(req.params.page)
  var pageNumber = currentPage - 1
  var skip = (itemsPerPage * pageNumber)
  //var limit = (itemsPerPage * pageNumber) + itemsPerPage

  let nameQuery = {}
  let cityQuery = {}


  let searchQuery = {}


  if(req.query.isQuoteAssignedToMe === 'true') {
    searchQuery['clients'] = req.user._id
  } else {
    searchQuery['ownerCompanies'] = req.user.ownerCompanies

  }



  if (req.query.search) {
    let arrObj = []
    //  nameQuery['name'] = new RegExp(req.query.search, 'i')
    //  cityQuery['address.city'] = new RegExp(req.query.search, 'i')
    arrObj.push({
      'name': new RegExp(req.query.search, 'i')
    })
    arrObj.push({
      'address.city': new RegExp(req.query.search, 'i')
    })
    arrObj.push({
      'address.address': new RegExp(req.query.search, 'i')
    })
    searchQuery = {
      $or: arrObj
    }
    //findQuery['address.city'] = new RegExp(req.query.search, 'i')
  }

  if (req.query.userId)
    searchQuery['clients'] = mongoose.Types.ObjectId(req.query.userId)

  if (req.query.projectId)
    searchQuery['projects'] = mongoose.Types.ObjectId(req.query.projectId)

  Quote.find(searchQuery)
  .populate({path: 'clients', model: 'User'})
  // .populate({path: 'devisDetails.bucketCategories.categorieInit', model: 'Categorie'})
  .limit(itemsPerPage).skip(skip)
  .sort(req.query.orderBy).exec(function (err, item) {
    if (err) {
      return res.status(404).json({message: 'No results', err: err})
    } else {
      Quote.find(searchQuery).count().exec(function (err, count) {
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

router.delete('/:id', function (req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({
      title: 'No rights',
      error: {
        message: 'No rights'
      }
    })
  }
  Quote.findById((req.params.id), function (err, item) {

    if (err) {
      return res.status(500).json({message: 'An error occured', err: err})
    }
    if (!item) {
      return res.status(404).json({
        title: 'No form found',
        error: {
          message: 'Form not found!'
        }
      });
    }

    // deleting the form from the database
    item.remove(function (err, result) {
      if (err) {
        return res.status(500).json({title: 'An error occured', error: err});
      }
      res.status(200).json({message: 'Item is deleted', obj: result});
    })
  });
});

module.exports = router;
