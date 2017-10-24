module.exports = {
  'database': 'mongodb://localhost:27017/my_mongo_DB',
    'secret': 'SUPERsecret', // change this to a hard to guess random string. it's for jwt encryption and decryption
    'userGmail': '', // used to send email
    'passGmail': '', // used to send email
    'jwtExpire': '72h' //set the jwtExpire in smaller period in categorieion
  };
