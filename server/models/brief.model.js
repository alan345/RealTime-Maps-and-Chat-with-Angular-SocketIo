var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
  //  Form                    = require('../models/form.model'),
  //  User                    = require('../models/user.model'),
  //  Quote                    = require('../models/quote.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')


var brief = new Schema({
  ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
  documents: [{type: Schema.Types.ObjectId, ref: 'Document'}],
  strats: [{type: Schema.Types.ObjectId, ref: 'Strat'}],
  details: {
    name: {type: String},
    description: {type: String},
  },
  forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
  dateBrief: {
    start: {type: Date, default: [Date()]},
    end: {type: Date, default: [Date()]},
  },
  // categorie: {
  //   categ0:[{name: {type: String}}],
  //   categ1:[{name: {type: String}}],
  //   categ2:[{name: {type: String}}],
  // },
  // progressTasks:{type: Number, default: [0]},
  // bucketTasks:[{
  //   bucketName:{type: String, default: ['']},
  //   tasks:[{type: Schema.Types.ObjectId, ref: 'Task'}
  //   //   {
  //   //   name: {type: String},
  //   //   status: {type: String},
  //   //   description: {type: String},
  //   //   assignedTos: [{type: Schema.Types.ObjectId, ref: 'User'}],
  //   //   dateTask:{
  //   //     creationDate: {type: Date, default: [Date()]},
  //   //     endDate: {type: Date, default: [Date()]},
  //   //   }
  //   // }
  // ]
  // }]
},
{
  timestamps: true
})

brief.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Brief', brief)
