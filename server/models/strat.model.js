var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator')


var strat = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
    // categories: [{type: Schema.Types.ObjectId, ref: 'Categorie'}],
    title: {type: String, default: ['']},
    stratType: {type: String, default: ['']},
    description: {type: String},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    dateStrat:{
      start: {type: Date, default: [Date()]},
      end: {type: Date, default: [Date()]},
    }

  },
  {
    timestamps: true
  })

strat.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Strat', strat)
