var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    //Categorie                    = require('../models/categorie.model'),
  //  Form                    = require('../models/form.model'),
  //  User                    = require('../models/user.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator');

var templateQuote = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    nameTemplate:{type: String, default: ['']},
    devisDetails: [
      {
        nameBucketCategories :{type: String},
        bucketCategories:[
          {
            categorieInit: {
              _id:{type: String},
              details: {
                referenceName: {type: String},
                reference: {type: String},
                price: {
                  costPrice: {type: Number},
                  sellingPrice: { type: Number},
                },
                description: {type: String},
                dimension: {
                  height: {type: Number},
                  width: {type: Number},
                  depth: {type: Number},
                }
              }
            },

            priceWithoutTaxes: {type: Number},
            priceWithTaxes: {type: Number},
            totalPriceWithoutTaxes: {type: Number},
            totalPriceWithTaxes: {type: Number},
            vat: {type: Number},
            quantity: {type: Number},
            discount: {type: Number},
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
