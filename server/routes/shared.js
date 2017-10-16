var Notification = require('../models/notification.model'),
  User = require('../models/user.model')

module.exports = {

  isCurentUserHasAccess(user, nameObject, typeAccess) {
    // console.log(user, nameObject, typeAccess)
    // console.log(user.rights)
    if (!user.rights.length)
      return true

    let rights = JSON.parse(JSON.stringify(user.rights))
    let permissionBool = false

    rights.forEach(right => {
      right.detailRight.permissions.forEach(permission => {
        if (permission.namePermission === nameObject)
          permission.access.forEach(singleAccess => {
            if (singleAccess.typeAccess === typeAccess)
              permissionBool = true
          })
        })
    })
    return permissionBool
  },

  postNotification(req, typeObject) {
    //init new notification
    return new Promise((resolve, reject) => {
      var notification = new Notification()
      notification.ownerCompanies = req.user.ownerCompanies
      notification.nameNotification = 'New Update ' + typeObject + ' ' + req.params.id
      notification.typeObject = typeObject
      notification.quotes = [req.params.id]

      let searchQuery = {}
      searchQuery['ownerCompanies'] = req.user.ownerCompanies
      User.find(searchQuery).populate({path: 'rights', model: 'Right'}).exec(function(err, item) {
        if (err) {
          reject(err)
          // return res.status(404).json({message: 'No results', err: err})
        } else {
          // add users with the 'notification right'
          item.forEach(user => {
            if (shared.isCurentUserHasAccess(user, typeObject, 'notification')) {
              notification.users.push(user)
            }
          })
          // add user owner of typeObject
          if (typeObject === 'quote') {
            req.body.projects.forEach(project => {
              project.assignedTos.forEach(user => {
                notification.users.push(user)
              })
            })
          }
          if (typeObject === 'userCalendar') {
            req.body.clients.forEach(client => {
              notification.users.push(client)
            })
          }

          //remove duplicate
          notification.users = Array.from(new Set(JSON.parse(JSON.stringify(notification.users))))

          // save in DB
          notification.save(function(err, result2) {
            if (err) {
              // console.log(err)
              // return res.status(403).json({
              //   title: 'There was an issue',
              //   error: {
              //     message: 'Error'
              //   }
              // })
            }
            // res.status(200).json({message: 'Ok', obj: 'ok'})
            resolve(result2)
          })

        }
      })
    })
  }

}
