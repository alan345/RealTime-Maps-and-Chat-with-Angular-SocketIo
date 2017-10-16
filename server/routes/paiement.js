var express = require('express'),
    router  = express.Router(),
    config  = require('../config/config'),
    User    = require('../models/user.model'),
    Companie= require('../models/companie.model'),
    PaiementQuote=require('../models/paiementQuote.model'),
    fs      = require('fs'),
    jwt     = require('jsonwebtoken'),
    stripe  = require("stripe")("sk_test_cg4vcpE5gV1ApywsErwoWL7u");

router.use('/', function (req, res, next) {
  var token = req.headers['authorization'];
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Authentication failed',
        message: 'Authentication failed',
        error: err
      })
    }
    if (!decoded) {
      return res.status(403).json({
        title: 'Authentication failed',
        error: {message: 'Authentication failed'}
      });
    }
    if (decoded) {

      User
      .findById(decoded.user._id)
      .populate({ path: 'rights', model: 'Right'})
      .exec(function (err, doc) {
        if (err) {
          return res.status(500).json({
            title: 'Fetching user failed',
            message: 'Fetching user failed',
            err: err
          });
        }
        if (!doc) {
          return res.status(404).json({
            title: 'The user was not found',
            error: {message: 'The user was not found'}
          })
        }
        // if (!shared.isCurentUserHasAccess(doc, nameObject, 'plan')) {
        //   return res.status(404).json({
        //     title: 'No rights',
        //     error: {
        //       message: 'No rights'
        //     }
        //   })
        // }
        if (doc) {
          req.user = doc;
          next();
        }
      });
    }
  });
});


router.get('/getStripeCust/:paiementQuoteId', function (req, res, next) {


    PaiementQuote.findById((req.params.paiementQuoteId), function (err, obj) {
      if (err) {
        return res.status(500).json({
          message: 'An error occured',
          err: err
        })
      }
      if (!obj) {
        return res.status(404).json({
          title: 'No obj found',
          error: {message: 'Obj not found!'}
        })
      }


                stripe.customers.retrieve(obj.stripe.cusId,
                  function(err, customer) {
                    if(err) {
                      return res.status(404).json({
                        title: 'No data in stripe',
                        error: 'noData'
                      });
                    } else {
                      if(customer.deleted) {
                        return res.status(404).json({
                          title: 'Deleted',
                          error: customer
                        });
                      }
                      return res.status(200).json({
                        customer: customer
                      })
                    }
                  }
                );
          })

})


router.get('/getStripeAccountDetails', function (req, res, next) {
    // if(!req.user.paiement.stripe.cusId) {
    //   return res.status(404).json({
    //     title: 'No data',
    //     error: 'noData'
    //   });
    // }


    stripe.accounts.retrieve(
      // req.user.paiement.stripe.cusId,
      '',
      function(err, customer) {
        if(err) {
          return res.status(404).json({
            title: 'No data in stripe',
            error: 'noData'
          });
        } else {
          if(customer.deleted) {
            return res.status(404).json({
              title: 'Deleted',
              error: customer
            });
          }
          return res.status(200).json({
            customer: customer
          })
        }
      }
    );
})



router.post('/saveCustInStripe/', function (req, res, next) {
    createCustomerInStripe(req).then(function(customer){
      updateStripeCustomerIdToDb(req, customer).then(function(item){
        if(item) {
          return res.status(200).json({
            customer: customer
          })
        } else {
          return res.status(404).json({
            title: 'No data in stripe',
            error: 'noData'
          });
        }
      }).catch((error) => {
        return res.status(404).json({
          title: 'Error not saved in db',
          error: error
        });
      });
    }).catch((error) => {
      return res.status(404).json({
        title: 'Error Not saved in stripe',
        error: error
      });
    });
});
router.post('/saveCardInStripe/:paiementQuoteId', function (req, res, next) {


  PaiementQuote.findById((req.params.paiementQuoteId), function (err, obj) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured',
        err: err
      })
    }
    if (!obj) {
      return res.status(404).json({
        title: 'No obj found',
        error: {message: 'Obj not found!'}
      })
    }

    createCardInStripe(req, obj)
    .then((card) => {
      return res.status(200).json({
        card: card
      })
    })
    .catch((error) => {
      return res.status(404).json({
        title: 'Error Not saved in stripe',
        error: error
      });
    });
  })
});
router.post('/payInStripe/:paiementQuoteId', function (req, res, next) {

    PaiementQuote.findById((req.params.paiementQuoteId), function (err, obj) {
      if (err) {
        return res.status(500).json({
          message: 'An error occured',
          err: err
        })
      }
      if (!obj) {
        return res.status(404).json({
          title: 'No obj found',
          error: {message: 'Obj not found!'}
        })
      }

      // var stripe = require("stripe")(
      //   "sk_test_uGq5JgMivZapIzAj14uAZKqw"
      // );

      // console.log(req.body.quote.name)
      // let cusId = req.user.paiement.stripe.cusId
      console.log(req.body)
      stripe.charges.create({
        amount: req.body.amount*100,
        customer: obj.stripe.cusId,
        currency: "usd",
        // source: "tok_visa", // obtained with Stripe.js
        description: 'quote'
      }, function(err, charge) {
        if(charge) {


          PaiementQuote.update({ _id: req.params.paiementQuoteId}, { $set: { amount: req.body.amount }}, function (err, item) {
            if (item) {
              return res.status(200).json({
                charge: charge
              })
            } else {
              return res.status(404).json({
                title: 'Error Not Updtaed price',
                error: err
              });
            }
          });

        } else {
          return res.status(404).json({
            title: 'Error Not saved in stripe',
            error: err
          });


        }
        // asynchronously called
      });

  })
});




router.post('/saveSubscriptionInStripe/:paiementQuoteId', function (req, res, next) {

  PaiementQuote.findById((req.params.paiementQuoteId), function (err, obj) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured',
        err: err
      })
    }
    if (!obj) {
      return res.status(404).json({
        title: 'No obj found',
        error: {message: 'Obj not found!'}
      })
    }


    createSubInStripe(req, obj)
    .then(function(subscription){
      // console.log('ssssss')
      updateCurrent_period_endInDb(req, subscription.current_period_end, subscription.plan.id)
      .then(item => { console.log(item) })
      .catch(err => {
        return res.status(404).json({
          title: 'Error not saved in db',
          error: err
        });
      })

      return res.status(200).json({
        subscription: subscription
      })
    })
    .catch((error) => {
      return res.status(404).json({
        title: 'Error Not saved in stripe',
        error: error
      });
    });
  })
});






  router.delete('/deleteSub/:idSub', function (req, res, next) {
    stripe.subscriptions.del(
      req.params.idSub,
      function(err, confirmation) {
        if(confirmation) {

            updateCurrent_period_endInDb(req, '', 'free')
            .then(item => { console.log(item) })
            .catch(err => {
              return res.status(404).json({
                title: 'Error not saved in db',
                error: err
              });
            })



          return res.status(200).json({
            message: confirmation
          })
        } else {
          return res.status(404).json({
            title: 'Error',
            error: err
          });
        }
      }
    );
  })

  router.delete('/deleteCard/:idCard/:paiementQuoteId', function (req, res, next) {


        PaiementQuote.findById((req.params.paiementQuoteId), function (err, obj) {
          if (err) {
            return res.status(500).json({
              message: 'An error occured',
              err: err
            })
          }
          if (!obj) {
            return res.status(404).json({
              title: 'No obj found',
              error: {message: 'Obj not found!'}
            })
          }


        stripe.customers.deleteCard(
          obj.stripe.cusId,
          req.params.idCard,
          function(err, confirmation) {
            if(confirmation) {
              return res.status(200).json({
                message: confirmation
              })
            } else {
              return res.status(404).json({
                title: 'Error',
                error: err
              });
            }
          }
        );
    })
  })

router.delete('/deleteCustInStripe/:paiementQuoteId', function (req, res, next) {

  PaiementQuote.findById((req.params.paiementQuoteId), function (err, obj) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured',
        err: err
      })
    }
    if (!obj) {
      return res.status(404).json({
        title: 'No obj found',
        error: {message: 'Obj not found!'}
      })
    }


    stripe.customers.del(obj.stripe.cusId,
      function(err, confirmation) {
        if(confirmation) {
          return res.status(200).json({
            message: confirmation
          })
        } else {
          return res.status(404).json({
            title: 'Error',
            error: err
          });
        }
      }
    );
  })
})



function updateCurrent_period_endInDb(req, current_period_end, plan){
  return new Promise(function(resolve, reject) {
    resolve()
  })
  // let paiement = req.user.paiement
  // paiement.stripe.planDetail.current_period_end = current_period_end*1000
  // paiement.stripe.planDetail.plan = plan
  //
  //
  // let planDetail = {
  //   current_period_end: current_period_end*1000,
  //   plan: plan
  // }
  // return new Promise(function(resolve, reject) {
  //   User.update({ _id: req.user._id }, { $set: { paiement: paiement}}, function (err, item) {
  //     if (item) {
  //       Companie.update({ _id: req.user.ownerCompanies[0] }, { $set: { planDetail: planDetail}}, function (err, item) {
  //         if (item) { resolve(item) } else { reject(err) }
  //       });
  //     } else { reject(err) }
  //   });
  //
  // })
}




function updateStripeCustomerIdToDb(req, customer) {
  return new Promise(function(resolve, reject) {
    PaiementQuote.update({ _id: req.body._id }, { $set: { stripe: {cusId : customer.id}}}, function (err, item) {
      if (item) { resolve(item) } else { reject(err) }
    });
  })
}


function createCustomerInStripe(req) {
  return new Promise(function(resolve, reject) {
    stripe.customers.create({
      description: 'Customer for' + req.user.email,
      email: req.user.email
    }, function(err, customer) {
      if(customer){
        console.log("customer Created in Stripe")
        // console.log(customer)
        resolve(customer)
      } else {
        // console.log(err)
        reject(error)
      }
    })
  })
}





function createSubInStripe(req, obj){

    // let cusId = req.user.paiement.stripe.cusId
    // console.log(req.body)
    return new Promise(function(resolve, reject) {
      stripe.subscriptions.create({
        customer: obj.stripe.cusId,
        plan: req.body.plan
      }, function(err, subscription) {
        if(subscription) {
          // console.log(subscription)
          resolve(subscription)
        } else {
          // console.log(err)
          reject(err)
        }
      });
    })
}

function createCardInStripe(req, obj){
  let cusId = obj.stripe.cusId
  console.log(obj.stripe.cusId)
  let card = req.body
  // console.log(card)
  // console.log(req.body)
  delete card.id
  delete card.brand
  delete card.country
  delete card.funding

  return new Promise(function(resolve, reject) {
      stripe.customers.createSource(
        cusId,
        {
          source: card
          // {
          //   "object": "card",
          //   "address_city": "EPinal",
          //   "address_country": "France",
          //   "address_line1": "70 chemin du petit chaperon rouge",
          //   "address_line2": "",
          //   "address_state": "assignedTos",
          //   "address_zip": "10100",
          //   "exp_month": 8,
          //   "exp_year": 2018,
          //   "number": "4242424242424242",
          //   // "last4": "4242",
          //   // "metadata": {},
          //   // "name": null,
          // }
         },
        function(err, card) {
          if(card) {
            resolve(card)
          } else {
            console.log(err)
            reject(err)
          }
        }
      );
  })
}





module.exports = router;
