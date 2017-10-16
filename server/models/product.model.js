var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),
    User                    = require('../models/user.model'),
    Companie                    = require('../models/companie.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')

var product = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    details: {
      referenceName: {type: String},
      reference: {type: String, default: ['']},
      unit: {type: String, default: ['']},
      price: {
        costPrice: {type: Number},
        sellingPrice: {type: Number},
        vat: {type: Number},
      },
      description: {type: String},
      dimension: {
        height: {type: Number},
        width: {type: Number},
        depth: {type: Number},
      }
    },
    stock: {
      quantity:{type: Number},
    },
    categorie: {
      categ0:[{name: {type: String}}],
      categ1:[{name: {type: String}}],
      categ2:[{name: {type: String}}],
    },
    vendors: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    categories: [{name: {type: String}, type:{type: String}}],
    owner: [{type: Schema.Types.ObjectId, ref: 'User'}]
  },
  {
    timestamps: true
  })

product.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Product', product)
