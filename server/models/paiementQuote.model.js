var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
  //  Form                    = require('../models/form.model'),
  //  User                    = require('../models/user.model'),
  //  Quote                    = require('../models/quote.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')


var paiementQuote = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    createdBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
    userDebiteds: [{type: Schema.Types.ObjectId, ref: 'User'}],
    quotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}],
    projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
    datePaiement: {type: Date},
    amount: {type: Number},
    isGooplusPaiement: {type: Boolean, default: [false]},
    type: {type: String, default: ['']},
    isExpense: {type: Boolean, default: [false]},
    stripe: {
      cusId: {type: String, default: ['']},
      isSubscription:{type: Boolean, default: [false]},
      planDetail:{
        plan:{type: String, default: ['']},
        current_period_end:{type: Date}
      }
    }
  },
  {
    timestamps: true
  })

paiementQuote.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('PaiementQuote', paiementQuote)
