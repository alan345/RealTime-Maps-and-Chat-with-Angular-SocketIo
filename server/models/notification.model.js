var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator');

var notification = new Schema({
  //  _id: String,
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
    quotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}],
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    userCalendars: [{type: Schema.Types.ObjectId, ref: 'UserCalendar'}],
    users : [{type: Schema.Types.ObjectId, ref: 'User'}],
    isRead: {type: Boolean, default: [false]},
    nameNotification: {type: String, default: ['']},
    typeObject: {type: String, default: ['']},


  },
  {
    timestamps: true
  });

notification.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Notification', notification);
