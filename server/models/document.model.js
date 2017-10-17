var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
  //  Form                    = require('../models/form.model'),
  //  User                    = require('../models/user.model'),
  //  Quote                    = require('../models/quote.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')


var document = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    missions: [{type: Schema.Types.ObjectId, ref: 'Mission'}],
    strats: [{type: Schema.Types.ObjectId, ref: 'Strat'}],
    briefs: [{type: Schema.Types.ObjectId, ref: 'Brief'}],
    details: {
      name: {type: String},
      description: {type: String},
    },

    owners: [{type: Schema.Types.ObjectId, ref: 'User'}],
    crewMembers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    reviewers: [{type: Schema.Types.ObjectId, ref: 'User'}],

    // strats: [{type: Schema.Types.ObjectId, ref: 'Strat'}],

    // assignedTos: [{type: Schema.Types.ObjectId, ref: 'User'}],
    status: {
      global: {type: String, default: ['WIP']},
      review: {type: Boolean, default: [false]},
      approve: {type: Boolean, default: [false]},
      changeRequest: {type: Boolean, default: [false]},
      changeSent: {type: Boolean, default: [false]},
      pendingActionFrom: {type: String, default: ['']},
    },
    link: {type: String, default: ['']},
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    currentUserBelongsTo: {type: String, default: ['']},
    activityPendingTasks: {type: Number, default: 0},
    myActivityPendingTasks: {type: Number, default: 0},
    // dateDocument:{
    //   start: {type: Date, default: [Date()]},
    //   end: {type: Date, default: [Date()]},
    // },
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

document.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Document', document)
