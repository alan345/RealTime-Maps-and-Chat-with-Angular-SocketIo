var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),
    User                    = require('../models/user.model'),
    Companie                    = require('../models/companie.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')

var categorie = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    name: {type: String, default: ['']},
    icone: {type: String, default: ['']},
    description: {type: String, default: ['']},
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],


  },
  {
    timestamps: true
  })

categorie.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Categorie', categorie)
