var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
  //  Form                    = require('../models/form.model'),
  //  User                    = require('../models/user.model'),
  //  Quote                    = require('../models/quote.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')


var Comment = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],

    commentName: {type: String, default: ['']},
    writtenBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
    quotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}],

  },
  {
    timestamps: true
  })

Comment.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Comment', Comment)
