var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    //Categorie                    = require('../models/categorie.model'),
  //  Form                    = require('../models/form.model'),
  //  User                    = require('../models/user.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator');

var quote = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
    // ownerQuotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    clients: [{type: Schema.Types.ObjectId, ref: 'User'}],
    // phoneNumber: {type: String, default: ['']},
    name: {type: String, default: ['']},
    statusQuote: {type: Number, default: [0]},
    detail: {
      currency: {type: String, default: ['']},
      quoteRef: {type: String, default: ['']},
      dateQuote: {
        issueDate: {type: Date, default: [Date()]},
        expiryDate: {type: Date, default: [Date()]},
      }
    },

    // typeQuote: {type: String, default: ['salon']},
    // _users : [{type: Schema.Types.ObjectId, ref: 'User'}],
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    devisDetails: [
      {
        nameBucketCategories :{type: String},
        bucketCategories:[
          {
            typeRow:{type: String},
            title:{type: String, default: ['']},
            // isCategorie: {type: Boolean, default: [true]},
            title: {type: String},
            priceWithoutTaxes: {type: Number},
            priceWithTaxes: {type: Number},
            totalPriceWithoutTaxes: {type: Number},
            totalPriceWithTaxes: {type: Number},
            vat: {type: Number},
            quantity: {type: Number},
            discount: {type: Number},
            categorieInit: [{type: Schema.Types.ObjectId, ref: 'User'}],

          }
        ]
      }

    ],
    priceQuote: {
      priceQuoteWithoutTaxes: {type: Number, default: [0]},
      priceQuoteWithTaxes: {type: Number, default: [0]},
      // paiementQuote: {type: Number, default: [0]},
    },
    signature:{
      base64:{type: String, default: ['']},
      dateSignature:{type: Date},
      users:[{type: Schema.Types.ObjectId, ref: 'User'}],
    }
    // ,
    // paiements:[
    //   {
    //     datePaiement:{type: Date},
    //     amount: {type: Number},
    //     type: {type: String},
    //   }
    // ]

  },
  {
    timestamps: true
  });

quote.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Quote', quote);
