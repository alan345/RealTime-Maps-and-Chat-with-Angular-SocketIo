var express = require('express'),
    router  = express.Router(),
    config  = require('../config/config'),
    User    = require('../models/user.model'),
    Companie    = require('../models/companie.model'),
    Form    = require('../models/form.model'),
    fs      = require('fs'),
    jwt     = require('jsonwebtoken'),
    // mongoose                = require('mongoose'),
    // Schema                  = mongoose.Schema,
    shared = require('./shared.js'),
    nameObject = 'companie'

// this process does not hang the nodejs server on error
process.on('uncaughtException', function (err) {
  console.log(err);
});

// Checking if user is authenticated or not, security middleware
router.use('/', function (req, res, next) {
  var token = req.headers['authorization'];
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
        error: {message: 'Authentication failed, malformed jwt. Please login or refresh Page'}
      });
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
          });
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
          req.user = doc;
          next();
        }
      })
    }
  })
});


router.put('/:id', function (req, res, next) {

  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({
      title: 'No rights',
      error: {message: 'No rights'}
    })
  }

  Companie.findById(({_id: req.params.id}), function (err, item) {
    if (err) {
      return res.status(404).json({
        message: err,
        err: err
      })
    }

    // item.ownerCompanies = req.user.companies
    item.rights = req.body.rights
    item.address = req.body.address
    item.option = req.body.option
    item.phoneNumber = req.body.phoneNumber
    item.faxNumber = req.body.faxNumber
    item.nameCompanie = req.body.nameCompanie
    item.typeUsers = req.body.typeUsers
    item.email = req.body.email
    item.VAT = req.body.VAT

    item.typeCompanie = req.body.typeCompanie
    item.forms = req.body.forms

    item.categJson = req.body.categJson
    item.categories = req.body.categories
    item.banck = req.body.banck
    item.contactsPerson = req.body.contactsPerson





    item.save(function (err, result) {
      if (err) {
        return res.status(404).json({
          message: 'There was an error, please try again',
          err: err
        });
      }
      res.status(201).json({
        message: '',
        obj: result
      });
    });

  })
});





router.post('/', function (req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({
      title: 'No rights',
      error: {message: 'No rights'}
    })
  }

  var companie = new Companie(req.body);
  //push
  companie.canBeSeenByCompanies = req.user.ownerCompanies


  companie.save(function (err, result) {
    if (err) {
      return res.status(403).json({
        title: 'There was an issue',
        error: {message: 'The email you entered already exists'}
      });
    }
    res.status(200).json({
      message: 'Registration Successfull',
      obj: result
    })
  })
});


router.post('/saveMyCompanie/', function (req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({
      title: 'No rights',
      error: {message: 'No rights'}
    })
  }

  var companie = new Companie(req.body);
  //push
  // companie.canBeSeenByCompanies = req.user.ownerCompanies

  companie.save(function (err, result) {
    if (err) {
      return res.status(403).json({
        title: 'There was an issue',
        error: {message: 'The email you entered already exists'}
      });
    }
    req.user.ownerCompanies = result._id
    req.user.save(function (err, result2) {
      if (err) {
        return res.status(403).json({
          title: 'There was an issue',
          error: {message: 'The email you entered already exists'}
        });
      }

      res.status(200).json({
        message: 'Registration Successfull2',
        obj: result
      })


    // res.status(200).json({
    //   message: 'Registration Successfull',
    //   obj: result
    // })
  })
  })
});



router.get('/page/:page', function (req, res, next) {
  var itemsPerPage = 15
  var currentPage = Number(req.params.page)
  var pageNumber = currentPage - 1
  var skip = (itemsPerPage * pageNumber)


  // let nameQuery = {}
  // let cityQuery = {}
  let searchQuery = {}
  // let arrObj = []
  searchQuery['canBeSeenByCompanies'] = req.user.ownerCompanies

  if(req.query.search)
    searchQuery['nameCompanie'] = new RegExp(req.query.search, 'i')


  Companie
  .find(searchQuery)
  .populate({ path: 'forms', model: 'Form'})
  .limit(itemsPerPage)
  .skip(skip)
  .sort(req.query.orderBy)
  .exec(function (err, item) {
    if (err) {
      return res.status(404).json({
        message: 'No results',
        err: err
      })
    } else {
      Companie
      .find(searchQuery)
      .count().exec(function (err, count) {
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



function getCompanie(req, res, next, id) {
  Companie
   .findById(id)
   .populate({path: 'forms', model: 'Form'})
   .populate({path: 'rights', model: 'Right'})
   .exec(function (err, item) {
     if (err) {
       return res.status(404).json({
         message: '',
         err: err
       })
     } if (!item) {
       return res.status(404).json({
         title: 'No obj found',
         error: {message: 'Obj not found!'}
       })
     } else {
       res.status(200).json({
         message: 'Success',
         item: item
       });
     }
   })


}


router.get('', function (req, res, next) {
    User
    .findOne({_id: req.user._id})
    .exec(function (err, user) {
      if (err) {
        return res.status(403).json({
          title: 'There was a problem',
          error: err
        });
      }

      if (!user) {
        return res.status(404).json({
          title: 'No form found',
          error: {message: 'Item not found!'}
        });
      }
      getCompanie(req, res, next, user.ownerCompanies[0])
    })
})





router.get('/:id', function (req, res, next) {
  getCompanie(req, res, next, req.params.id)

})


router.delete('/:id', function (req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({
      title: 'No rights',
      error: {message: 'No rights'}
    })
  }
  Companie.findById((req.params.id), function (err, item) {
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
      });
    }


    item.remove(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(200).json({
        message: 'Item is deleted',
        obj: result
      });
    })
  });
});



module.exports = router;
