var express = require('express'),
  router = express.Router(),
  config = require('../config/config'),
  User = require('../models/user.model'),
  Strat = require('../models/strat.model'),
  Document = require('../models/document.model'),
  Mission = require('../models/mission.model'),
  Form = require('../models/form.model'),
  fs = require('fs'),
  jwt = require('jsonwebtoken'),
  shared = require('./shared.js'),
  nameObject = 'document',
  Log = require('../models/log.model')

// this process does not hang the nodejs server on error
process.on('uncaughtException', function(err) {
  console.log(err)
})

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
        if (!shared.isCurentUserHasAccess(doc, nameObject, 'read')) {
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

//
// router.get('/myDocuments', function (req, res, next) {
//
//   let searchQuery = {}
//   searchQuery['ownerCompanies'] = req.user.ownerCompanies
//   searchQuery['users'] = mongoose.Types.ObjectId(req.user._id)
//   let returnData = []
//   Mission.find(searchQuery).sort('-createdAt').exec(function (err, itemMissions) {
//     if (err) {
//       return res.status(404).json({message: 'No results', err: err})
//     } else {
//       let itemMissionsId = []
//       itemMissions.forEach(itemMission => itemMissionsId.push(itemMission._id))
//       // console.log(itemMissionsId)
//
//
//
//       let searchQueryDoc = {
//         missions: { '$in' : itemMissionsId}
//       }
//       // searchQueryDoc['missions'] = mongoose.Types.ObjectId(singleMission._id)
//       Document
//       .find(searchQueryDoc)
//       .populate({path: 'missions', model: 'Mission'})
//       .exec(function (err, itemDocuments) {
//         if (err) {
//           console.log(err)
//           // return res.status(404).json({
//           //   message: 'No results',
//           //   err: err
//           // })
//         } else {
//           res.status(200).json({message: 'Successfull', obj: itemDocuments})
//         }
//       })
//
//     }
//   })
// })

//
// router.put('/updateTask/:id', function (req, res, next) {
//   if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
//     return res.status(404).json({
//       title: 'No rights',
//       error: {
//         message: 'No rights'
//       }
//     })
//   }
//   Document.findById(({_id: req.params.id}), function (err, item) {
//     if (err) {
//       return res.status(404).json({message: '', err: err})
//     } else {
//
//
//       var task = new Task(req.body.task)
//       // console.log(Task)
//       // item.bucketTasks[req.body.bucketTaskIndex].tasks[req.body.taskIndex] = task
//       item.bucketTasks[req.body.bucketTaskIndex].tasks.push( task)
//       // console.log(item)
//
//       item.save(function (err, result) {
//         if (err) {
//           return res.status(404).json({message: 'There was an error, please try again', err: err})
//         }
//         res.status(201).json({message: 'Updated successfully', obj: result})
//       })
//
//     }
//   })
// })

router.put('/:id', function(req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({
      title: 'No rights',
      error: {
        message: 'No rights'
      }
    })
  }
  Document.findById(({_id: req.params.id}), function(err, item) {
    if (err) {
      return res.status(404).json({message: '', err: err})
    } else {
      //console.log(req.body)
      // item.ownerCompanies = req.user.ownerCompanies
      item.details = req.body.details
      item.forms = req.body.forms
      item.status = req.body.status
      // item.embed = req.body.embed

      // item.bucketTasks = req.body.bucketTasks
      // item.progressTasks = req.body.progressTasks
      item.dateDocument = req.body.dateDocument
      item.link = req.body.link

      item.crewMembers = req.body.crewMembers
      item.reviewers = req.body.reviewers
      item.quotes = req.body.quotes

      item.save(function(err, result) {
        if (err) {
          return res.status(404).json({message: 'There was an error, please try again', err: err})
        }

        var log = new Log()
        log.ownerCompanies = req.user.ownerCompanies
        log.users = [req.user]
        log.documents = [req.params.id]
        log.type = 'change'
        log.save(function(err, result) {
          if (err) {
            console.log(err)
          } else {
            console.log(result)
          }
        })

        res.status(201).json({message: 'Updated successfully', obj: result})
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
  // if (!req.user.companies.length) {
  //   return res.status(404).json({message: 'You must belong to a companie', err: ''})
  // }
  console.log(req.user.companies)
  req.body.ownerCompanies = req.user.ownerCompanies
  req.body.owners = req.user._id
  // document.ownerCompanies = req.user.companies
  var document = new Document(req.body)
  document.save(function(err, result) {
    if (err) {
      console.log(err)
      return res.status(403).json({
        title: 'There was an issue',
        error: {
          message: 'Error'
        }
      })
    }
    res.status(200).json({message: 'Registration Successfull', obj: result})
  })
})

router.get('/page/:page', function(req, res, next) {
  var itemsPerPage = 10
  var currentPage = Number(req.params.page)
  var pageNumber = currentPage - 1
  var skip = (itemsPerPage * pageNumber)

  let searchQuery = {}

  if (req.query.myDocuments) {
    let arrObj = []
    arrObj.push({
      'crewMembers': mongoose.Types.ObjectId(req.user._id)
    })
    arrObj.push({
      'reviewers': mongoose.Types.ObjectId(req.user._id)
    })
    searchQuery = {
      $or: arrObj
    }
  }

  searchQuery['ownerCompanies'] = req.user.ownerCompanies

  if (req.query.search)
    searchQuery['details.name'] = new RegExp(req.query.search, 'i')

  if (req.query.missionId)
    searchQuery['missions'] = mongoose.Types.ObjectId(req.query.missionId)

  if (req.query.stratId)
    searchQuery['strats'] = mongoose.Types.ObjectId(req.query.stratId)

  if (req.query.briefId)
    searchQuery['briefs'] = mongoose.Types.ObjectId(req.query.briefId)

    // console.log(hasWhatsNewCateg)
  // console.log(searchQuery)

  Document.find(searchQuery).sort('-createdAt')
  // .populate({path: 'clients', model: 'User'})
  // .populate({path: 'assignedTos', model: 'User'})
    .populate({path: 'missions', model: 'Mission'}).populate({path: 'strats', model: 'Strat'}).populate({path: 'briefs', model: 'Brief'}).populate({path: 'crewMembers', model: 'User'}).populate({path: 'reviewers', model: 'User'}).populate({path: 'owners', model: 'User'})
  // .populate({path: 'quotes', model: 'Quote'})
  // .populate(
  //   {
  //     path: 'bucketTasks.tasks.assignedTos',
  //     model: 'User',
  //   })
    .limit(itemsPerPage).skip(skip).exec(function(err, items) {
    if (err) {
      return res.status(404).json({message: 'No results', err: err})
    } else {
      items.forEach((document, i) => {
        document.reviewers.forEach(reviewer => {
          if (reviewer._id.toString() === req.user._id.toString())
            items[i].currentUserBelongsTo = 'client'
        })
        document.crewMembers.forEach(crewMember => {
          if (crewMember._id.toString() === req.user._id.toString())
            items[i].currentUserBelongsTo = 'crew'
        })
        if (document.status.global !== 'COMPLETE') {
          items[i].activityPendingTasks++
          if (document.currentUserBelongsTo === document.status.pendingActionFrom)
            items[i].myActivityPendingTasks++
          }
        })

      Document.find(searchQuery).count().exec(function(err, count) {

        res.status(200).json({
          paginationData: {
            totalItems: count,
            currentPage: currentPage,
            itemsPerPage: itemsPerPage
          },
          data: items
        })
      })
    }
  })
})

//must be deprecated by documentsByMissions
// router.get('/documentsInMissions', function(req, res, next) {
//   let searchQuery = {}
//   searchQuery['ownerCompanies'] = req.user.ownerCompanies
//   if (req.query.projectId)
//     searchQuery['projects'] = mongoose.Types.ObjectId(req.query.projectId)
//   let missionIds = []
//   Mission.find(searchQuery).exec(function(err, missionItems) {
//     if (err) {
//       return res.status(404).json({message: 'No results', err: err})
//     } else {
//       missionItems.forEach(mission => missionIds.push(mission._id))
//       let searchQueryDocument = {
//         missions: {
//           '$in': missionIds
//         }
//       }
//       searchQueryDocument['ownerCompanies'] = req.user.ownerCompanies
//       Document.find(searchQueryDocument).exec(function(err, items) {
//         items.forEach((document, i) => {
//           document.reviewers.forEach(reviewer => {
//             if (reviewer.toString() === req.user._id.toString())
//               items[i].currentUserBelongsTo = 'client'
//           })
//           document.crewMembers.forEach(crewMember => {
//             if (crewMember.toString() === req.user._id.toString())
//               items[i].currentUserBelongsTo = 'crew'
//           })
//           if (document.status.global !== 'COMPLETE') {
//             items[i].activityPendingTasks++
//             if (document.currentUserBelongsTo === document.status.pendingActionFrom)
//               items[i].myActivityPendingTasks++
//             }
//           })
//         if (err) {
//           return res.status(404).json({message: 'No results', err: err})
//         } else {
//           res.status(200).json({message: 'Success', item: items})
//         }
//       })
//     }
//   })
// })

router.get('/documentsByMissions', function(req, res, next) {
  let returnData = []
  let searchQuery = {}
  searchQuery['ownerCompanies'] = req.user.ownerCompanies
  if (req.query.projectId)
    searchQuery['projects'] = mongoose.Types.ObjectId(req.query.projectId)

  Mission.find(searchQuery).exec(function(err, missionItems) {
    if (err) {
      return res.status(404).json({message: 'No results', err: err})
    } else {
      let requests = missionItems.map((mission) => {
        return new Promise(function(resolve, reject) {
          let searchQueryDocument = {}
          if (req.query.myDocuments) {
            let arrObj = []
            arrObj.push({
              'crewMembers': mongoose.Types.ObjectId(req.user._id)
            })
            arrObj.push({
              'reviewers': mongoose.Types.ObjectId(req.user._id)
            })
            searchQueryDocument = {
              $or: arrObj
            }
          }

          searchQueryDocument['missions'] = mission._id
          searchQueryDocument['ownerCompanies'] = req.user.ownerCompanies

          Document.find(searchQueryDocument).exec(function(err, documents) {
            documents.forEach((document, i) => {
              document.reviewers.forEach(reviewer => {
                if (reviewer.toString() === req.user._id.toString())
                  documents[i].currentUserBelongsTo = 'client'
              })
              document.crewMembers.forEach(crewMember => {
                if (crewMember.toString() === req.user._id.toString())
                  documents[i].currentUserBelongsTo = 'crew'
              })
              if (document.status.global !== 'COMPLETE') {
                documents[i].activityPendingTasks++
                if (document.currentUserBelongsTo === document.status.pendingActionFrom)
                  documents[i].myActivityPendingTasks++
                }
              })

              returnData.push({mission: mission, documents: documents})
              resolve()
              if (err) {
                reject()
              }
            // else {
            //   res.status(200).json({message: 'Success', item: documents})
            // }
          })
        })

      })
      Promise.all(requests).then(() => {
        res.status(200).json({message: 'Successfull', data: returnData})
      })

    }
  })
})

router.get('/documentsInStrats', function(req, res, next) {
  let searchQuery = {}
  searchQuery['ownerCompanies'] = req.user.ownerCompanies
  if (req.query.projectId)
    searchQuery['projects'] = mongoose.Types.ObjectId(req.query.projectId)
  let stratIds = []
  Strat.find(searchQuery).exec(function(err, missionItems) {
    if (err) {
      return res.status(404).json({message: 'No results', err: err})
    } else {
      missionItems.forEach(mission => stratIds.push(mission._id))
      let searchQueryDocument = {
        strats: {
          '$in': stratIds
        }
      }
      searchQueryDocument['ownerCompanies'] = req.user.ownerCompanies
      Document.find(searchQueryDocument).exec(function(err, items) {
        items.forEach((document, i) => {
          document.reviewers.forEach(reviewer => {
            if (reviewer.toString() === req.user._id.toString())
              items[i].currentUserBelongsTo = 'client'
          })
          document.crewMembers.forEach(crewMember => {
            if (crewMember.toString() === req.user._id.toString())
              items[i].currentUserBelongsTo = 'crew'
          })
          if (document.status.global !== 'COMPLETE') {
            items[i].activityPendingTasks++
            if (document.currentUserBelongsTo === document.status.pendingActionFrom)
              items[i].myActivityPendingTasks++
            }
          })
        if (err) {
          return res.status(404).json({message: 'No results', err: err})
        } else {
          res.status(200).json({message: 'Success', item: items})
        }
      })
    }
  })
})

// router.get('/unwind', function (req, res, next) {
//
//   let aggregate = []
//   aggregate.push({
//     $match: {
//       ownerCompanies: req.user.ownerCompanies
//     }
//   })
//
//
//
//   if (req.query.idDocument)
//     aggregate.push({
//       $match: {
//         _id: mongoose.Types.ObjectId(req.query.idDocument)
//       }
//     })
//
//   aggregate.push({$unwind: "$bucketTasks"})
//   aggregate.push({$unwind: "$bucketTasks.tasks"})
//
//   if (req.query.myTasks === 'true')
//     aggregate.push({
//       $match: {
//         'bucketTasks.tasks.assignedTos': mongoose.Types.ObjectId(req.user._id)
//       }
//     })
//   aggregate.push({
//     $lookup: {
//       from: 'users',
//       localField: 'bucketTasks.tasks.assignedTos',
//       foreignField: '_id',
//       as: 'bucketTasks.tasks.assignedTos'
//     }
//   })
//
//   Document.aggregate(aggregate).exec(function (err, item) {
//     if (err) {
//       return res.status(404).json({message: '', err: err})
//     } else {
//       res.status(200).json({message: 'Success', item: item})
//     }
//   })
// })

// getting user forms to display them on front end
router.get('/:id', function(req, res, next) {

  Document.findById((req.params.id), function(err, obj) {
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

    Document.findById({_id: req.params.id}).populate({path: 'briefs', model: 'Brief'}).populate({path: 'missions', model: 'Mission'}).populate({path: 'strats', model: 'Strat'}).populate({path: 'crewMembers', model: 'User'}).populate({path: 'reviewers', model: 'User'}).populate({path: 'owners', model: 'User'})
    // .populate({path: 'logs.forms', model: 'Form'})
    // .populate({path: 'logs.by', model: 'User'})
    // .populate({path: 'assignedTos', model: 'User'})
    // .populate({
    //   path: 'bucketTasks.tasks',
    //   model: 'Task',
    //   populate: {
    //     path: 'users',
    //     model: 'User'
    //   }
    // }).populate({
    //   path: 'bucketTasks.tasks',
    //   model: 'Task',
    //   populate: {
    //     path: 'documents',
    //     model: 'Document'
    //   }
      .exec(function(err, item) {
      if (err) {
        return res.status(404).json({message: '', err: err})
      } else {
        res.status(200).json({message: 'Success', item: item})
      }
    })
  })
})

//
//
// // getting user forms to display them on front end
// router.get('/countNewItemForUser/:id', function (req, res, next) {
//   User
//   .findOne({_id: req.params.id})
//   .exec(function (err, user) {
//     if (err) {
//       return res.status(403).json({
//         title: 'There was a problem',
//         error: err
//       });
//     } else {
//       Document
//       .find({createdAt:{"$gt": user.trackinPage.lastVisitPageDocument}})
//       .exec(function (err, item) {
//         if (err) {
//           return res.status(404).json({
//             message: '',
//             err: err
//           })
//         } else {
//           res.status(200).json({
//             message: 'Success',
//             item: item
//           })
//         }
//       })
//     }
//   })
// })

router.delete('/:id', function(req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({
      title: 'No rights',
      error: {
        message: 'No rights'
      }
    })
  }
  Document.findById((req.params.id), function(err, item) {
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
