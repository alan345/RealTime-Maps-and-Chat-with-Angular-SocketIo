var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    //Product                    = require('../models/product.model'),
  //  Form                    = require('../models/form.model'),
  //  User                    = require('../models/user.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator');

var templateQuote = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    nameTemplate:{type: String, default: ['']},
    devisDetails: [
      {
        nameBucketProducts :{type: String},
        bucketProducts:[
          {
            typeRow:{type: String},
            title:{type: String, default: ['']},
            // isProduct: {type: Boolean, default: [true]},
            // title: {type: String},
            priceWithoutTaxes: {type: Number},
            priceWithTaxes: {type: Number},
            totalPriceWithoutTaxes: {type: Number},
            totalPriceWithTaxes: {type: Number},
            vat: {type: Number},
            quantity: {type: Number},
            discount: {type: Number},
            productInit: [{type: Schema.Types.ObjectId, ref: 'User'}],

          }
        ]
      }

    ],

  },
  {
    timestamps: true
  });

templateQuote.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('TemplateQuote', templateQuote);
