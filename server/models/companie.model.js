var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),
    User                    = require('../models/user.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator');

var companie = new Schema({

    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    canBeSeenByCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    banck: {
      serviceSelected:{type: String, default: ['']},
      stripe:{
        secretKey:{type: String, default: ['']},
      }
    },
    planDetail:{
      plan:{type: String, default: ['']},
      current_period_end:{type: Date}
    },
    rights: [{type: Schema.Types.ObjectId, ref: 'Right'}],
    address: {
      address : {type: String, default: ['']},
      city : {type: String, default: ['']},
      state : {type: String, default: ['']},
      zip : {type: String, default: ['']},
    },
    option:{
      calendar: {
        timeBegin: {type: Number, default: [8]},
        timeEnd: {type: Number, default: [19]},
      }
    },
    phoneNumber: {type: String, default: ['']},
    nameCompanie: {type: String, default: ['']},
    typeCompanie: {type: String, default: ['salon']},
    //users : [{type: Schema.Types.ObjectId, ref: 'User'}],
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    // categJson: {
    //   categCategorie:{type: String, default: ['']},
    //   categProject:{type: String, default: ['']}
    // },
    typeUsers:[{value:{type: String}}],
    categories: {
      categCategorie:[{
        categ: {type: String, default: ['']},
        isFlagged: {type: Boolean, default: [false]},
        subCateg:[{
          categ: {type: String, default: ['']},
          subCateg:[{
            categ: {type: String, default: ['']},
          }]
        }]
      }],
      categProject:[{
        categ: {type: String, default: ['']},
        isFlagged: {type: Boolean, default: [false]},
        subCateg:[{
          categ: {type: String, default: ['']},
          subCateg:[{
            categ: {type: String, default: ['']},
          }]
        }]
      }]
    }


  },
  {
    timestamps: true
  });

companie.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Companie', companie);
