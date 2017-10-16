var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator');

var right = new Schema({
  //  _id: String,
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],

    detailRight: {
        nameRight: {type: String, default: ['']},
        permissions:[{
          namePermission: {type: String, default: ['']},
          access:[{
              typeAccess: {type: String, default: ['']},
            }]
          }]
      }

  },
  {
    timestamps: true
  });

right.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Right', right);
