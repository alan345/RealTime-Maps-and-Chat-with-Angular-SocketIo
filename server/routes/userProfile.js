var express = require('express'),
  router = express.Router(),
  passwordHash = require('password-hash'),
  jwt = require('jsonwebtoken'),
  config = require('../config/config'),
  fs = require('fs'),
  async = require('async'),
  nodemailer = require('nodemailer'),
  multer = require('multer'),
  mime = require('mime'),
  path = require('path'),
  crypto = require("crypto"),
  gm = require('gm').subClass({imageMagick: true});

var User = require('../models/user.model');

var stripe = require("stripe")("sk_test_cg4vcpE5gV1ApywsErwoWL7u");

router.use('/', function(req, res, next) {
  var token = req.headers['authorization'];
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      return res.status(401).json({title: 'Authentication failed', message: 'Authentication failed', error: err})
    }
    if (!decoded) {
      return res.status(403).json({
        title: 'Authentication failed',
        error: {
          message: 'Authentication failed'
        }
      });
    }
    if (decoded) {
      User.findById(decoded.user._id, function(err, doc) {
        if (err) {
          return res.status(500).json({title: 'Fetching user failed', message: 'Fetching user failed', err: err});
        }
        if (!doc) {
          return res.status(404).json({
            title: 'The user was not found',
            error: {
              message: 'The user was not found'
            }
          })
        }
        if (doc) {
          req.user = doc;
          next();
        }
      });
    }
  });
});

// get all forms from database
router.get('/page/:page', function(req, res, next) {
  var itemsPerPage = 15
  var currentPage = Number(req.params.page)
  var pageNumber = currentPage - 1
  var skip = (itemsPerPage * pageNumber)
  var limit = (itemsPerPage * pageNumber) + itemsPerPage

  //  let parentUserToSearch = ''
  let roleToSearch = []
  let searchQuery = {}

  if (req.query.isExternalUser === 'true') {
    // searchQuery['isExternalUser'] = true
    searchQuery['canBeSeenByCompanies'] = req.user.ownerCompanies
    searchQuery['ownerCompanies'] = {
      $ne: req.user.ownerCompanies
    }
  }

  if (req.query.isExternalUser === 'false') {
    // searchQuery['isExternalUser'] = false
    searchQuery['ownerCompanies'] = req.user.ownerCompanies

  }

  if (req.query.search) {
    let arrObj = []
    arrObj.push({
      'profile.name': new RegExp(req.query.search, 'i')
    })
    arrObj.push({
      'profile.lastName': new RegExp(req.query.search, 'i')
    })
    searchQuery['$or'] = arrObj
  }

  User.find(searchQuery)
  // .populate({ path: 'companies', model: 'Companie'})
    .populate({path: 'ownerCompanies', model: 'Companie'}).limit(itemsPerPage).skip(skip).sort(req.query.orderBy).exec(function(err, item) {
    if (err) {
      return res.status(404).json({message: 'No results', err: err})
    } else {
      User.find(searchQuery).count().exec(function(err, count) {
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

function getUser(req, res, next, id) {
  User.findById(id).populate({path: 'forms', model: 'Form'}).populate({path: 'rights', model: 'Right'}).populate({path: 'salesMan', model: 'User'}).populate({path: 'ownerCompanies', model: 'Companie'}).populate({path: 'profile.profilePicture', model: 'Form'})
  // .populate({
  //     path: 'companies',
  //     model: 'Companie',
  //     populate: {
  //       path: 'forms',
  //       model: 'Form'
  //     }
  //   })
    .exec(function(err, user) {
    if (err) {
      return res.status(403).json({title: 'There was a problem', error: err});
    }

    if (!user) {
      return res.status(404).json({
        title: 'No form found',
        error: {
          message: 'Item not found!'
        }
      });
    }

    // user.isExternalUser = false
    user.isExternalUser = true
    user.ownerCompanies.forEach((companie, index) => {
      // console.log(companie._id )
      // console.log(req.user.ownerCompanies , companie._id.toString()  )
      console.log(req.user.ownerCompanies.toString(), companie._id.toString())
      if (req.user.ownerCompanies.toString() == companie._id.toString())
        user.isExternalUser = false
    })
    console.log(user.isExternalUser)
    // console.log(user)
    return res.status(200).json({user: user})
  })
}

router.get('/:id', function(req, res, next) {
  let id = req.params.id
  getUser(req, res, next, id)
});

router.get('', function(req, res, next) {
  let id = req.user._id
  getUser(req, res, next, id)
});

// setting up multer for profile pic upload
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var dest = 'server/uploads/profiles/' + req.user._id; // i know, i should use dirname blah blah :)
    var stat = null;
    try {
      stat = fs.statSync(dest);
      var profileDir = 'server/uploads/profiles/' + req.user._id;
      rmDir(profileDir, false);
    } catch (err) {
      fs.mkdirSync(dest);
    }
    if (stat && !stat.isDirectory()) {
      throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
    }
    cb(null, dest)
  },
  filename: function(req, file, cb) {
    //if you want even more random characters prefixing the filename then change the value '2' below as you wish, right now, 4 charaters are being prefixed
    crypto.pseudoRandomBytes(2, function(err, raw) {
      cb(null, raw.toString('hex') + '.' + file.originalname.toLowerCase());
    });
  }
});

// telling multer what storage we want and filefiltering to check if file is an image, the 'parts' property declares how many fields we are expecting from front end
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000, // 5MB filesize limit
    parts: 3
  },
  fileFilter: function(req, file, cb) {
    var filetypes = /jpe?g|png/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: File upload only supports the following filetypes - " + filetypes);
  }
});

router.post('/image', upload.single('profilePic'), function(req, res, err) {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(500).json({message: 'There was an error', error: err});
  }

  // finding the user who initialized the upload from front end
  User.findById(req.user._id, function(err, user) {
    if (err) {
      return res.status(500).json({title: 'An error occured', err: err});
    }
    // setting our new form to be saved in database, we fetch the data from the front end,
    // req.file.path is coming from multer, we need that value to store the path to database
    // at the end we assinging the owner of the form by passing the user _id to the form
    // in the backend we are referencing each form to the user who uploaded it
    // so later on we can display the data in the front end
    // resize middleware, just change 400 to whatever you like, the null parameter maintains aspect ratio, if you want exact dimensions replace null with a height number as you wish
    // console.log(req.file);
    gm(req.file.path).resize(400, null).noProfile().write(req.file.path, function(err) {
      if (err) {
        console.log(err);
        fs.unlink(req.file.path);
        // this will result a 404 when frontend tries to access the image, I ll provide a fix soon
      }
    });
    user.update({
      $set: {
        profilePic: req.file.filename
      }
    }, function(err, result) {
      if (err) {
        return res.status(404).json({message: 'There was an error, please try again', err: err});
      }
      res.status(201).json({message: '', obj: result});
    });
  });
});

// change user password from front end form inside user's profile
router.post('/password', function(req, res, next) {
  User.findOne({
    _id: req.user._id
  }, function(err, user) {
    if (err) {
      return res.status(403).json({title: 'There was a problem', error: err});
    }
    if (!passwordHash.verify(req.body.currentPassword, user.password)) {
      return res.status(403).json({
        title: 'You cannot change the password',
        error: {
          message: 'Incorrect current password, please try again'
        }
      })
    } else {
      var newPassword = passwordHash.generate(req.body.newPassword);
      user.update({
        $set: {
          password: newPassword
        }
      }, function(err, result) {
        if (err) {
          return res.status(404).json({message: 'There was an error, please try again', err: err});
        }
        res.status(201).json({message: 'Password changed successfully', obj: result});
      })
    }
  });
});

router.put('/:id/dateSeeLatestNotif', function(req, res, next) {
  User.findById(({_id: req.params.id}), function(err, item) {
    if (err) {
      return res.status(404).json({message: '', err: err})
    } else {
      item.dateSeeLatestNotif = new Date()
      item.save(function(err, result) {
        if (err) {
          return res.status(404).json({message: 'There was an error, please try again', err: err});
        }
        res.status(201).json({message: '', obj: result});
      });
    }
  })
});

router.put('/:id', function(req, res, next) {
  User.findById(({_id: req.params.id}), function(err, item) {
    if (err) {
      return res.status(404).json({message: '', err: err})
    } else {
      // req.body.ownerCompanies = req.user.ownerCompanies
      item.companies = req.body.companies
      item.ownerCompanies = req.body.ownerCompanies
      item.email = req.body.email
      item.forms = req.body.forms
      // item.salesMan = req.body.salesMan
      item.profile = req.body.profile
      item.typeUsers = req.body.typeUsers
      item.rights = req.body.rights

      item.save(function(err, result) {
        if (err) {
          return res.status(404).json({message: 'There was an error, please try again', err: err});
        }
        res.status(201).json({message: '', obj: result});
      });
    }
  })
});

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
//
// // user Create without email. See register
router.post('/', function(req, res, next) {
  //  console.log(req.body)
  // let uniqueString = makeid()
  // let email = ''
  // let role = ''
  // if (req.body.email) {
  //   email = req.body.email
  // } else {
  //   email = 'random_' + uniqueString + '@random.com'
  // }

  if (req.body.role) {
    role = req.body.role
  } else {
    role = ['client']
  }

  // if(!req.body.companies.length)
  //   req.body.companies = req.body.ownerCompanies

  // req.body.isInOwnerCompanie = false
  if (!req.body.isExternalUser)
    req.body.ownerCompanies = req.user.ownerCompanies

  if (req.body.isExternalUser) {
    req.body.ownerCompanies = req.body.canBeSeenByCompanies
    req.body.canBeSeenByCompanies = req.user.ownerCompanies
  }

  delete req.body._id
  // var project = new Project(req.body)
  var user = new User(req.body)

    user.role = role
    user.password = passwordHash.generate(makeid()),

    user.save(function(err, user) {
      if (err) {
        return res.status(403).json({title: 'There was an issue', error: err});
      }
      res.status(200).json({message: 'Registration Successfull', obj: user})
      sendEmailToUserToJoinCompanie(req, user)
    })
  });

  function sendEmailToUserToJoinCompanie(req, user) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save(function(err) {
          done(err, token, user);
        });

      },
      function(token, user, done) {
        var mailer = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: config.userGmail,
            pass: config.passGmail
          }
        })
        var html = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Email from My Chair App by Phyto Paris</title>
          <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"></link>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Montserrat', sans-serif;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc;">

            <tr>
              <td bgcolor="#ffffff" style="padding: 15px 15px 15px 15px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td>Hi ${user.profile.name} ${user.profile.lastName},</td>
                  </tr>
                  <tr>
                    <td style="padding: 15px 0 30px 0;">
                      You have been invited to join a salon on the Gooplus Management App.
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="background-color: #0a2f87; padding: 10px 15px; cursor: pointer;">
                      <a
                        href="http://${req.headers.host}/#/user/reset/${token}"
                        style="color: #ffffff; text-decoration: none;"
                      >
                        Accept the Invitation
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </body>
      </html>
      `;
        var mailOptions = {
          to: user.email,
          from: 'hello@gooplus.fr',
          subject: 'Gooplus Management | New Invitation',
          html: html
        };
        mailer.sendMail(mailOptions, function(err) {
          console.log('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          return res.status(200).json({message: 'Success', token: 'InMail'})
        });
      }
    ], function(err) {
      console.log(err)
      if (err)
        return next(err);
      }
    );
  }

  //
  // var rmDir = function (dirPath, removeSelf) {
  //   if (removeSelf === undefined)
  //     removeSelf = true;
  //   try {
  //     var files = fs.readdirSync(dirPath);
  //   }
  //   catch (e) {
  //     return;
  //   }
  //   if (files.length > 0)
  //     for (var i = 0; i < files.length; i++) {
  //       var filePath = dirPath + '/' + files[i];
  //       if (fs.statSync(filePath).isFile())
  //         fs.unlinkSync(filePath);
  //       else
  //         rmDir(filePath);
  //     }
  //   if (removeSelf)
  //     fs.rmdirSync(dirPath);
  // };
  //
  //

  router.delete('/:id', function(req, res, next) {
    User.findById((req.params.id), function(err, item) {
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

  module.exports = router;
