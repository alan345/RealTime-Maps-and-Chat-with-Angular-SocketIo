var express      = require('express'),
    path         = require('path'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    mongoose     = require('mongoose'),
    config       = require('./config/config')

var userRoute    = require('./routes/user')
// var promotionRoute    = require('./routes/promotion')
var companieRoute    = require('./routes/companie')
var quoteRoute    = require('./routes/quote')
var uploadRoute  = require('./routes/upload')
var forgotRoutes = require('./routes/forgetPassword')
var resetRoutes  = require('./routes/resetPassword')
var userForms    = require('./routes/userForms')
var userProfile  = require('./routes/userProfile')
var adminPage    = require('./routes/admin')
var tasks        = require('./routes/task')
var products    = require('./routes/product')
var projects    = require('./routes/project')
var userCalendars    = require('./routes/userCalendar')
var paiement    = require('./routes/paiement')
var paiementQuote    = require('./routes/paiementQuote')
var expense    = require('./routes/expense')
var templateQuotes    = require('./routes/templateQuote')
var right    = require('./routes/right')
var notification    = require('./routes/notification')
var comment    = require('./routes/comment')
var chat    = require('./routes/chat')






// // SOCKET.io
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// io.on('connection', (socket) => {
//
//     console.log('user connected');
//
//     socket.on('disconnect', function() {
//         console.log('user disconnected');
//     });
//
//     socket.on('add-message', (message) => {
//         io.emit('message', { type: 'new-message', text: message });
//         // Function above that stores the message in the database
//         // databaseStore(message)
//         console.log('here you must save' + message)
//     });
// });
// http.listen(5000, () => {
//     console.log('Server SOCKET.io started on port 5000');
// });
// // SOCKET.io









var app = express()

mongoose.Promise = global.Promise  // gets rid of the mongoose promise deprecated warning
mongoose.connect(config.database)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../dist')))
app.use('/uploads', express.static(__dirname + '/uploads'))

// CORS setup
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
  next()
})

// setting up routes models
app.use('/user', userRoute)
// app.use('/promotion', promotionRoute)
app.use('/profile', userProfile)
app.use('/companie', companieRoute)
app.use('/quote', quoteRoute)
app.use('/user/forgot', forgotRoutes)
app.use('/user/reset', resetRoutes)
app.use('/uploads', uploadRoute)
app.use('/forms', userForms)
app.use('/task', tasks)
app.use('/product', products)
app.use('/project', projects)
app.use('/admin', adminPage)
app.use('/userCalendar', userCalendars)
app.use('/paiement', paiement)
app.use('/paiementQuote', paiementQuote)
app.use('/expense', expense)
app.use('/templateQuote', templateQuotes)
app.use('/right', right)
app.use('/notification', notification)
app.use('/comment', comment)
app.use('/chat', chat)




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})

module.exports = app
