var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
  //  Form                    = require('../models/form.model'),
  //  User                    = require('../models/user.model'),
  //  Quote                    = require('../models/quote.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')


var project = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    details: {
      name: {type: String},
      description: {type: String},
    },
    clients: [{type: Schema.Types.ObjectId, ref: 'User'}],
    assignedTos: [{type: Schema.Types.ObjectId, ref: 'User'}],
    status: {type: String, default: [0]},
    // logs:[{
    //   comment: {type: String, default: ['']},
    //   by: [{type: Schema.Types.ObjectId, ref: 'User'}],
    //   forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    //   date: {type: Date, default: [Date()]},
    // }],
    status: {type: Number},
    dateProject:{
      creationDate: {type: Date, default: [Date()]},
    },
    categorie: {
      categ0:[{name: {type: String}}],
      categ1:[{name: {type: String}}],
      categ2:[{name: {type: String}}],
    },
    progressTasks:{type: Number, default: [0]},
    bucketTasks:[{
      bucketName:{type: String, default: ['']},
      tasks:[{type: Schema.Types.ObjectId, ref: 'Task'}
      //   {
      //   name: {type: String},
      //   status: {type: String},
      //   description: {type: String},
      //   assignedTos: [{type: Schema.Types.ObjectId, ref: 'User'}],
      //   dateTask:{
      //     creationDate: {type: Date, default: [Date()]},
      //     endDate: {type: Date, default: [Date()]},
      //   }
      // }
      
    ]
    }]
  },
  {
    timestamps: true
  })

project.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Project', project)
