var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator');

var chat = new Schema({
  //  _id: String,
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    // projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
    strats: [{type: Schema.Types.ObjectId, ref: 'Strat'}],
    missions: [{type: Schema.Types.ObjectId, ref: 'Mission'}],
    projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
    // userCalendars: [{type: Schema.Types.ObjectId, ref: 'UserCalendar'}],
    users : [{type: Schema.Types.ObjectId, ref: 'User'}],
    // isRead: {type: Boolean, default: [false]},
    // nameChat: {type: String, default: ['']},
    chatName: {type: String, default: ['']},


  },
  {
    timestamps: true
  });

chat.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Chat', chat);
