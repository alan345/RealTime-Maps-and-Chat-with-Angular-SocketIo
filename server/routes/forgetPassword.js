var express     = require('express'),
    router      = express.Router(),
    crypto      = require("crypto"),
    nodemailer  = require('nodemailer'),
    async       = require('async'),
    sgTransport = require('nodemailer-sendgrid-transport'),
    config      = require('../config/config');

var User = require('../models/user.model');


// requesting password reset and setting the fields resetPasswordToken to a newly generated token
// and resetPasswordExpires to the exact date the form is submitted so we can set/check the validity of the timestamp (token is valid for only one hour)
// after that, the user must request a new password reset.

router.post('/', function (req, res, next) {
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
          return res.status(403).json({
            title: 'There was an error',
            error: err
          });
        }
        if (!user) {
          return res.status(403).json({
            title: 'Please check if your email is correct',
            error: {message: 'Please check if your email is correct'}
          })
        }

        user.resetPasswordToken   = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function (err) {
          done(err, token, user);
        });
      });
    },

    // sending the notification email to the user with the link and the token created above
    function (token, user, done) {
      // var options = {
      //   auth: {
      //     //please edit the config file and add your SendGrid credentials
      //     api_user: config.api_user,
      //     api_key: config.api_key
      //   }
      // };
      //var mailer  = nodemailer.createTransport(sgTransport(options));


      // see https://nodemailer.com/usage/
      var mailer = nodemailer.createTransport({
          service: "Gmail",
          // host: 'smtp.gmail.com',
          // port: 587,
          // secure: true, // upgrade later with STARTTLS
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
              <td align="center" bgcolor="#0a2f87" height="150">
                <img
                  src="http://${req.headers.host}/assets/images/mychair-logo-horizontal-white.png"
                  alt="Email from My Chair by Phyto Paris" width="305" height="100" style="display: block; color: #ffffff;"
                />
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffff" style="padding: 15px 15px 15px 15px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding: 15px 0 30px 0;">
                      You are receiving this email because you or someone else asked for a password reset for your account on the My Chair by Phyto Paris App.
                      Please follow the link or copy paste it in your browser address bar to initiate password change:
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="background-color: #0a2f87; padding: 10px 15px;">
                      <a
                        href="http://${req.headers.host}/#/user/reset/${token}"
                        style="background-color: #0a2f87; padding: 10px 15px; border: none; outline: none; color: #ffffff; text-decoration: none;"
                      >
                        Reset Password
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 15px 0 30px 0;">
                      Direct Link: http://${req.headers.host}/#/user/reset/${token}<br>
                      The link will remain active for one hour. If you didnt asked for a password reset, please ignore this email and contact your manager to let them know someone tried to log into your account.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td bgcolor="#eeeeee">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                 <tr>
                  <td style="padding: 15px 15px 15px 15px;">
                    <a href="https://www.phyto.com/" style="text-decoration: none;">Phyto Website</a>
                  </td>
                  <td style="padding: 15px 15px 15px 15px;">
                    <a href="mailto:mychair@alesgroup.com?Subject=My%20Chair%20App%20Invitation%20Email" style="text-decoration: none;">Contact Us</a>
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
        from: config.userGmail,
        subject: 'My Chair by Phyto Paris | Password Change Request  ',
        html: html
      };
      mailer.sendMail(mailOptions, function (err) {
        console.log('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        return res.status(200).json({
          message: 'Success',
          token:'InMail'
        })
      });
    }
  ], function (err) {
    console.log(err)
    if (err) return next(err);
  });
});

module.exports = router;
