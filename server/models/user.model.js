var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),

    mongooseUniqueValidator = require('mongoose-unique-validator')

var user = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    canBeSeenByCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    // companies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    // isAdminOfHisCompanie:{type: Boolean, default: [false]},
    isExternalUser:{type: Boolean, default: [false]},
    dateSeeLatestNotif: {type: Date, default: [Date()]},
    email: {type: String, unique: true, required: true, lowercase: true},
    password: {type: String, required: true},
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    paiement: {
      stripe:[{
        companies:[{type: Schema.Types.ObjectId, ref: 'Companie'}],
        cusId:{type: String, default: ['']},
        planDetail:{
          plan:{type: String, default: ['']},
          current_period_end: {type: Date, default: [Date()]},
        }
      }]
    },
    // salesMan: [{type: Schema.Types.ObjectId, ref: 'User'}],
    resetPasswordToken: String,
    resetPasswordExpires: String,
    role: {type: Array, default: ['client']},
    rights: [{type: Schema.Types.ObjectId, ref: 'Right'}],
    typeUsers: {type: Array},
    profile : {
      profilePicture : [{type: Schema.Types.ObjectId, ref: 'Form'}],
      language: {type: String, default: ['fr']},
      name: {type: String, default: ['']},
      sourceContact: {type: String, default: ['']},
      companyName: {type: String, default: ['']},
      fax:{type: String, default: ['']},
      title: {type: String, default: ['']},
      lastName: {type: String, default: ['']},
      phoneNumber:{type: String, default: ['']},
      typeClient:{type: String, default: ['']},
      colorCalendar:{type: String, default: ['#ad2121']},
      statusHouse:{type: String, default: ['']},
      otherData:{type: String, default: ['']},
      detailHouse:{
        typeHouse:{type: String, default: ['']},
        surface:{type: Number, default: [0]},
        accesCode:{type: String, default: ['']},
        floor:{type: String, default: ['']},
        accessType:{type: String, default: ['']},
      },
      address:[{
        nameAddress:  {type: String, default: ['']},
        address : {type: String, default: ['']},
        address2 : {type: String, default: ['']},
        city : {type: String, default: ['']},
        state : {type: String, default: ['']},
        zip : {type: String, default: ['']},
        country : {type: String, default: ['']},
      }],
    }
  },
  {
    timestamps: true
  })

user.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', user);
