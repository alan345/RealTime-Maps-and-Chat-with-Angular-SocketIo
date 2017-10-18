var express = require('express'),
  router = express.Router(),
  config = require('../config/config'),
  User = require('../models/user.model'),
  Chat = require('../models/chat.model'),
  Log = require('../models/log.model'),
  Mission = require('../models/mission.model'),
  Strat = require('../models/strat.model'),
  Form = require('../models/form.model'),
  fs = require('fs'),
  jwt = require('jsonwebtoken')

// SOCKET.io
var app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection', (socket) => {

  var room = socket.handshake['query']['r_var'];

  // console.log(room)
  socket.join(room);
  console.log('user connected to ' + room);
  // getInitMessages()
  // io.emit('message', { type: 'new-message', text: 'alan' });
  // io.emit('message', { type: 'new-message', text: 'alan' });
  // io.emit('message', { type: 'new-message', text: 'alan' });
  // io.emit('message', { type: 'new-message', text: 'alan' });
  // io.emit('message', { type: 'new-message', text: 'alan' });

  socket.on('disconnect', function() {
    socket.leave(room)
    console.log('user disconnected');
  });

  socket.on('add-message', (message) => {
    // console.log(message)
    io.to(room).emit('message', {
      type: 'new-message',
      chatName: message.chatName,
      createdAt: Date(),
      users: message.users
    });
    // Function above that stores the message in the database
    // databaseStore(message)
    // console.log('here you must save' + message)

    saveChat(message)
  });
});
http.listen(5000, () => {
  console.log('Server SOCKET.io started on port 5000');
});
// SOCKET.io

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
        // if(!shared.isCurentUserHasAccess(doc, nameObject, 'read')) {
        //   return res.status(404).json({
        //     title: 'No rights',
        //     error: {message: 'No rights'}
        //   })
        // }
        if (doc) {
          req.user = doc

          next()
        }
      })
    }
  })
})

//
// //update
// router.put('/:id', function (req, res, next) {
//   if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
//     return res.status(404).json({ title: 'No rights', error: {message: 'No rights'} })
//   }
//
//   Chat.findById(({_id: req.params.id}), function (err, item) {
//     if (err) {
//       return res.status(404).json({
//         message: '',
//         err: err
//       })
//     } else {
//       //console.log(req.body)
//         item.quotes = req.body.quotes
//         item.amount = req.body.amount
//         item.type = req.body.type
//         item.datePaiement = req.body.datePaiement
//
//
//
//         item.save(function (err, result) {
//           if (err) {
//             return res.status(404).json({
//               message: 'There was an error, please try again',
//               err: err
//             })
//           }
//           res.status(201).json({
//             message: 'Updated successfully',
//             obj: result
//           })
//         })
//
//     }
//   })
// })
//
// router.post('/', function (req, res, next) {
//   if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
//     return res.status(404).json({ title: 'No rights', error: {message: 'No rights'} })
//   }
//   if(!req.user.ownerCompanies.length) {
//     return res.status(404).json({
//       message: 'You must belong to a companie',
//       err: ''
//     })
//   }
//
//
//   var chat = new Chat(req.body)
//   chat.addedBy = req.user._id
//   chat.ownerCompanies = req.user.ownerCompanies
//
//   chat.save(function (err, result) {
//     if (err) {
//       console.log(err)
//       return res.status(403).json({
//         title: 'There was an issue',
//         error: {message: 'Error'}
//       })
//     }
//     res.status(200).json({
//       message: 'Registration Successfull',
//       obj: result
//     })
//   })
// })
//

// get all forms from database
router.get('/page/:page', function(req, res, next) {
  var itemsPerPage = 10
  var currentPage = Number(req.params.page)
  var pageNumber = currentPage - 1
  var skip = (itemsPerPage * pageNumber)

  let searchQuery = {}
  // searchQuery['ownerCompanies'] = req.user.ownerCompanies
  //
  //
  // if(req.query.search)
  //   searchQuery['details.name'] = new RegExp(req.query.search, 'i')
  //
  //
  if (req.query.projectId)
    searchQuery['projects'] = mongoose.Types.ObjectId(req.query.projectId)


  Chat.find(searchQuery).sort('-createdAt')
  // .populate({path: 'quotes', model: 'Quote'})
  // .populate({
  //   path: 'quotes',
  //   model: 'Quote',
  //   populate: {
  //     path: 'clients',
  //     model: 'User'
  //   }
  // })
    .populate({path: 'users', model: 'User'}).populate({
    path: 'users',
    model: 'User',
    populate: {
      path: 'forms',
      model: 'Form'
    }
  })
  // .populate(
  //   {
  //     path: 'bucketTasks.tasks.assignedTos',
  //     model: 'User',
  //   })
    .limit(itemsPerPage).skip(skip).exec(function(err, item) {
    if (err) {
      return res.status(404).json({message: 'No results', err: err})
    } else {
      Chat.find(searchQuery).count().exec(function(err, count) {
        item.sort()
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

router.get('/unreadChatInMissions', function(req, res, next) {
  let searchQuery = {}
  searchQuery['ownerCompanies'] = req.user.ownerCompanies
  searchQuery['users'] = mongoose.Types.ObjectId(req.user._id)
  let returnData = []
  Mission.find(searchQuery).sort('-createdAt').exec(function(err, itemMissions) {
    if (err) {
      return res.status(404).json({message: 'No results', err: err})
    } else {
      let requests = itemMissions.map((singleMission) => {
        return new Promise(function(resolve, reject) {
          let searchQueryLog = {}
          searchQueryLog['missions'] = mongoose.Types.ObjectId(singleMission._id)
          Log.findOne(searchQueryLog).sort('-createdAt').exec(function(err, itemLog) {
            if (err) {
              console.log(err)
            } else {

              let searchQueryChat = {}
              searchQueryChat['missions'] = mongoose.Types.ObjectId(singleMission._id)
              if (itemLog) {
                searchQueryChat['createdAt'] = {
                  '$gte': itemLog.createdAt
                }
              }
              Chat.find(searchQueryChat).count().exec(function(err, CountItemChat) {
                if (err) {
                  console.log(err)
                } else {
                  returnData.push({mission: singleMission, countUnread: CountItemChat})
                  resolve()
                }
              })
            }
          })
        })
      })
      Promise.all(requests).then(() => {
        res.status(200).json({message: 'Successfull', obj: returnData})
      })
    }
  })
})

// ALAN QUi sont les personnes qui peucent voir les notifs du chat

router.get('/unreadChatInStrats', function(req, res, next) {
  let searchQuery = {}
  searchQuery['ownerCompanies'] = req.user.ownerCompanies
  searchQuery['users'] = mongoose.Types.ObjectId(req.user._id)
  let returnData = []
  Strat.find(searchQuery).sort('-createdAt').exec(function(err, itemStrats) {
    if (err) {
      return res.status(404).json({message: 'No results', err: err})
    } else {
      let requests = itemStrats.map((singleStrat) => {
        return new Promise(function(resolve, reject) {
          let searchQueryLog = {}
          searchQueryLog['missions'] = mongoose.Types.ObjectId(singleStrat._id)
          Log.findOne(searchQueryLog).sort('-createdAt').exec(function(err, itemLog) {
            if (err) {
              console.log(err)
            } else {

              let searchQueryChat = {}
              searchQueryChat['missions'] = mongoose.Types.ObjectId(singleStrat._id)
              if (itemLog) {
                searchQueryChat['createdAt'] = {
                  '$gte': itemLog.createdAt
                }
              }
              Chat.find(searchQueryChat).count().exec(function(err, CountItemChat) {
                if (err) {
                  console.log(err)
                } else {
                  returnData.push({mission: singleStrat, countUnread: CountItemChat})
                  resolve()
                }
              })
            }
          })
        })
      })
      Promise.all(requests).then(() => {
        res.status(200).json({message: 'Successfull', obj: returnData})
      })
    }
  })
})

//
//
//
//
//
// router.delete('/:id', function (req, res, next) {
//   if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
//     return res.status(404).json({ title: 'No rights', error: {message: 'No rights'} })
//   }
//   Chat.findById((req.params.id), function (err, item) {
//     if (err) {
//       return res.status(500).json({
//         message: 'An error occured',
//         err: err
//       })
//     }
//     if (!item) {
//       return res.status(404).json({
//         title: 'No form found',
//         error: {message: 'Form not found!'}
//       })
//     }
//
//     // deleting the form from the database
//     item.remove(function (err, result) {
//       if (err) {
//         return res.status(500).json({
//           title: 'An error occured',
//           error: err
//         })
//       }
//       res.status(200).json({
//         message: 'Item is deleted',
//         obj: result
//       })
//     })
//   })
// })

//
//
// function getInitMessages(){
//   var itemsPerPage = 20
//   var currentPage = 1
//   var pageNumber = currentPage - 1
//   var skip = (itemsPerPage * pageNumber)
//
//   let searchQuery = {}
//   // searchQuery['ownerCompanies'] = req.user.ownerCompanies
//
//
//   // if(req.query.search)
//   //   searchQuery['details.name'] = new RegExp(req.query.search, 'i')
//   //
//   //
//   // if(req.query.idQuote)
//   //   searchQuery['quotes'] = mongoose.Types.ObjectId(req.query.idQuote)
//
//
//   Chat
//   .find(searchQuery)
//   .sort('-createdAt')
//   // .populate({path: 'quotes', model: 'Quote'})
//   .limit(itemsPerPage)
//   .skip(skip)
//   .exec(function (err, item) {
//     if (err) {
//       return res.status(404).json({
//         message: 'No results',
//         err: err
//       })
//     } else {
//       // return item
//       item.sort()
//       item.forEach(chat=> {
//         io.emit('message', chat);
//       })
//
//     }
//   })
// }

function saveChat(message) {
  // console.log('saveChat')
  // console.log(message)
  var chat = new Chat()
  chat.chatName = message.chatName
  chat.users = message.users
  chat.projects = message.projects
  chat.ownerCompanies = message.ownerCompanies
  chat.save(function(err, result) {
    if (err) {
      console.log(err)
    }
    // console.log(result)
  })
}

module.exports = router
