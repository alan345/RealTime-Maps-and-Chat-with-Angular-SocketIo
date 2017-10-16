var express = require('express'),
  router = express.Router(),
  config = require('../config/config'),
  User = require('../models/user.model'),
  Quote = require('../models/quote.model'),
  Companie = require('../models/companie.model'),

  fs = require('fs'),
  jwt = require('jsonwebtoken'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  shared = require('./shared.js'),
  nameObject = 'quote'

var fs = require('fs');
var pdf = require('html-pdf');

// this process does not hang the nodejs server on error
process.on('uncaughtException', function(err) {
  console.log(err);
});

router.get('/:id', function(req, res, next) {

  Quote.findById((req.params.id), function(err, obj) {
    if (err) {
      return res.status(500).json({message: 'An error occured', err: err})
    }
    if (!obj) {
      return res.status(404).json({
        title: 'No form found',
        error: {
          message: 'Form not found!'
        }
      })
    }

    // let findQuery = {}
    // findQuery['_id'] = req.params.id
    Quote.findById({_id: req.params.id}).populate({
      path: 'projects',
      model: 'Project',
      populate: {
        path: 'assignedTos',
        model: 'User'
      }
    }).populate({path: 'companieClients', model: 'Companie'}).populate({path: 'signature.users', model: 'User'}).populate({path: 'clients', model: 'User'}).populate({path: 'invoices', model: 'Quote'})
    // .populate({path: 'devisDetails.bucketProducts.productInit', model: 'Product'})
      .populate({
      path: 'devisDetails.bucketProducts.productInit',
      model: 'Product',
      populate: {
        path: 'forms',
        model: 'Form'
      }

    }).exec(function(err, item) {
      if (err) {
        return res.status(404).json({message: '', err: err})
      }
      if (!item) {
        return res.status(404).json({
          title: 'No obj found',
          error: {
            message: 'Obj not found!'
          }
        })
      } else {
        res.status(200).json({message: 'Success', item: item});
      }
    })
  })
})

// Checking if user is authenticated or not, security middleware
router.use('/', function(req, res, next) {
  var token = req.headers['authorization'];
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      return res.status(401).json({message: 'Authentication failed', error: err})
    }
    if (!decoded) {
      return res.status(404).json({
        title: 'Authentication Failed',
        error: {
          message: 'Authentication failed, malformed jwt. Please login or refresh Page'
        }
      });
    }
    if (decoded) {
      User.findById(decoded.user._id).populate({path: 'rights', model: 'Right'}).exec(function(err, doc) {
        if (err) {
          return res.status(500).json({message: 'Fetching user failed', err: err});
        }
        if (!doc) {
          return res.status(404).json({
            title: 'User not found',
            error: {
              message: 'The user was not found'
            }
          })
        }
        if (!shared.isCurentUserHasAccess(doc, 'quote', 'read')) {
          return res.status(404).json({
            title: 'No rights',
            error: {
              message: 'No rights'
            }
          })
        }
        if (doc) {
          req.user = doc;
          next();
        }
      })
    }
  })
});

router.get('/pdf/:quoteId', function(req, res, next) {

  var options = {
    format: 'Letter',
    "header": {
      "height": "70px"
    },
    "footer": {
      "height": "0px"
    },
    "border": "10px"
  };

  User.findOne({_id: req.user._id}).exec(function(err, user) {
    if (err) {
      return res.status(403).json({title: 'There was a problem', error: err});
    }

    if (!user) {
      return res.status(404).json({
        title: 'No form found',
        error: {
          message: 'Item not found!'
        }
      });
    }

    Companie.findById(user.ownerCompanies[0]).populate({path: 'forms', model: 'Form'}).populate({path: 'rights', model: 'Right'}).exec(function(err, companie) {
      if (err) {
        return res.status(404).json({message: '', err: err})
      }
      if (!companie) {
        return res.status(404).json({
          title: 'No obj found',
          error: {
            message: 'Obj not found!'
          }
        })
      } else {

        Quote.findById((req.params.quoteId), function(err, obj) {
          if (err) {
            return res.status(500).json({message: 'An error occured', err: err})
          }
          if (!obj) {
            return res.status(404).json({
              title: 'No form found',
              error: {
                message: 'Form not found!'
              }
            })
          }

          // let findQuery = {}
          // findQuery['_id'] = req.params.id
          Quote.findById({_id: req.params.quoteId}).populate({
            path: 'projects',
            model: 'Project',
            populate: {
              path: 'assignedTos',
              model: 'User'
            }
          }).populate({path: 'signature.users', model: 'User'}).populate({path: 'clients', model: 'User'}).populate({
            path: 'devisDetails.bucketProducts.productInit',
            model: 'Product',
            populate: {
              path: 'forms',
              model: 'Form'
            }
          }).exec(function(err, item) {
            if (err) {
              return res.status(404).json({message: '', err: err})
            }
            if (!item) {
              return res.status(404).json({
                title: 'No obj found',
                error: {
                  message: 'Obj not found!'
                }
              })
            } else {

              var html = ''
              html += `
                 <style type="text/css">

                 .col-1 {
                   width: 8.33%;
                 }

                 .col-2 {
                   width: 16.66%;
                 }

                 .col-3 {
                   width: 25%;
                 }

                 .col-4 {
                   width: 33.33%;
                 }

                 .col-5 {
                   width: 41.66%;
                 }

                 .col-6 {
                   width: 50%;
                 }

                 .col-7 {
                   width: 58.33%;
                 }

                 .col-8 {
                   width: 66.66%;
                 }

                 .col-9 {
                   width: 75%;
                 }

                 .col-10 {
                   width: 83.33%;
                 }

                 .col-11 {
                   width: 91.66%;
                 }

                 .col-12 {
                   width: 100%;
                 }

                 .img {
                   height: 20px;
                 }

                 .imglogo {
                   height: 50px;
                   text-align: center;
                  display: block;
                  margin-left: auto;
                  margin-right: auto
                 }

                 .tabo {
                   border: 1px solid #ddd;
                 }

                 .bgh {
                   background-color: #595959;
                   color: white;
                   border: 1px solid #ddd;
                 }

                 .desc {
                   text-align: left;
                 }

                 .elem {
                   text-align: center;
                 }
                 .alright {
                   text-align: right;
                 }

                 .inf {
                   font-size: 10px;
                 }

                 .inf2 {
                   font-size: 9px;
                 }

                 .nobo {
                   border-top: none!important;
                   border-bottom: none!important;
                 }

                 .cobo {
                   border: 1px solid #ddd;
                 }

                 table {
                   border-collapse: collapse;
                   width: 100%;
                 }

                 td {
                   font-size: 9px;
                   height: 20px;
                   vertical-align: center;
                   border-left: 1px solid #ddd;
                   border-right: 1px solid #ddd;
                 }

                 th {
                   font-size: 10px;
                 }

                  .cgv {
                   font-size: 6px;
                  text-align: center!important;
                 }

                  p  {
                   font-size: 9px;
                    font-weight: 300;
                 }

                 .ts {
                   background-color: #aba4a4;
                   font-weight: bold;
                 }
                 #pageHeader {

                   width:100%;
                   height: 50px;

                }
               #pageBody {height: 0px;}
               .test2 {margin-bottom: -50px; }

                 </style>
                 `
              html += `
              <div id="pageHeader" class="col-12">
                <img class="imglogo" src="http://belmard-renovation.fr/wp-content/uploads/2016/05/BELMARD.png">
              </div>
              <table class="test">
                       <thead>
                         <tr>
                           <th class="col-4 cobo desc">

                           <p><b>Belmard Bâtiment</b></p>
                           <p>30, rue Belgrand</p>
                           <p>75020 Paris</p>
                           <p>Tel : 01.40.33.88.33</p>
                           <p>Mail : Belmard.batiment@gmail.com</p>

                           </th>
                           <th class="col-4 nobo"></th>
                           <th class="col-4 cobo desc">`

              item.clients.forEach(user => {
                html += user.profile.title
                html += ' '
                html += user.profile.name
                html += ' '
                html += user.profile.lastName
                html += '<br>'
                html += 'Numéro & rue'
                html += '<br>'
                html += 'Zip & City'
                html += '<br>'
                html += user.profile.phoneNumber
                html += '<br>'
                html += 'Mail : client@mail.com'

              })
              html += `
                           </th>
                         </tr>
                       </thead>
                     </table>
                     <br>
                     <table>
                       <thead>
                         <tr>
                           <th class="col-12 cobo desc">Objet : ` + item.name + `
                           </th>
                         </tr>
                       </thead>
                     </table>
                     <br>
                     <table class="tabo">
                       <thead>
                         <tr>
                           <th class="col-5 bgh">Description</th>
                           <th class="col-1 bgh">Image</th>
                           <th class="col-1 bgh">Unit</th>
                           <th class="col-1 bgh">Quantity</th>
                           <th class="col-1 bgh">Unit Price</th>
                           <th class="col-1 bgh">Total tax excl</th>
                           <th class="col-2 bgh">Tax</th>
                         </tr>
                       </thead>
                       <tbody>`

              item.devisDetails.forEach(devisDetail => {
                html += '<tr class="ts">'
                html += '<td class="desc">' + devisDetail.nameBucketProducts + '</td>'
                html += `
                         <td class="desc"></td>
                         <td class="desc"></td>
                         <td class="desc"></td>
                         <td class="desc"></td>
                         <td class="desc"></td>
                         <td class="desc"></td>
                        </tr>`
                devisDetail.bucketProducts.forEach(bucketProduct => {
                  html += '<tr>'
                    let description = ''
                    let img = ''
                    let unit = ''
                    if (bucketProduct.typeRow === 'text') {
                      description = bucketProduct.title
                    }
                    if (bucketProduct.typeRow === 'product') {
                      bucketProduct.productInit.forEach(product => {
                        description = product.details.referenceName
                        unit = product.details.unit
                        product.forms.forEach(form => {
                          img = '<img class="img" src="' +
                            'http://localhost/uploads/forms/' + form.owner + '/' + form.imagePath + '">'
                        })
                      })
                    }
                    html += '<td class="desc">' + description + '</td>'
                    html += '<td class="elem">' + img + '</td>'
                    // html += '<td class="desc">' + bucketProduct.typeRow + '</td>'
                    // html += '<td class="elem">' + bucketProduct.title + '</td>'
                    html += '<td class="elem">' + unit + '</td>'
                    html += '<td class="elem">' + bucketProduct.quantity + '</td>'
                    html += '<td class="elem">' + bucketProduct.priceWithoutTaxes + '</td>'
                    html += '<td class="elem">' + bucketProduct.totalPriceWithoutTaxes + '</td>'
                    html += '<td class="elem">' + bucketProduct.vat + '%</td>'
                  html += '</tr>'

                })
              })

              html += `
                       </tbody>
                     </table>
                     <br>
                     <table class="cobo">
                         <tr class="cobo">

                           <td class="col-6 alright"></td>`

              item.priceQuote.priceQuoteTaxes.forEach(priceQuoteTaxe => {
                html += `<td class="col-2 ts elem">TVA: ` + priceQuoteTaxe.VAT + `%</td>`
                // html += `<td class="col-2 ts elem">` + priceQuoteTaxe.TotalVAT + `€</td>`
              })

              //  <td class="col-2 ts elem">TVA 5.5%</td>
              //  <td class="col-2 ts elem">TVA 10%</td>
              html += `
                            <td class="col-2 ts elem"><b>TOTAL</b></td>
                           </tr>
                           <tr class="cobo">
                           <td class="col-6 alright ts">Sous-Total HT</td>`

              item.priceQuote.priceQuoteTaxes.forEach(priceQuoteTaxe => {
                //  html += `<td class="col-2 ts elem">TVA: ` + priceQuoteTaxe.VAT + `%</td>`
                html += `<td class="col-2 elem">` + Math.round(priceQuoteTaxe.TotalVAT / (priceQuoteTaxe.VAT / 100)) + `€</td>`
              })
              html += `

                           <td class="col-2 elem"><b>` + Math.round(item.priceQuote.priceQuoteWithoutTaxes) + `€</b></td>
                           </tr>`

              //
              //     item.priceQuote.priceQuoteTaxes.forEach(priceQuoteTaxe => {
              // html += `<tr>
              //           <td>
              //           </td>
              //           <td class="col-2 form-control">
              //             TVA: ` + priceQuoteTaxe.VAT + `%
              //           </td>
              //           <td class="col-2 form-control">
              //             ` + priceQuoteTaxe.TotalVAT + `€
              //           </td>
              //       </tr>`
              //    })

              html += `<tr class="cobo">
                             <td class="col-6 alright ts">Montant de TVA</td>`
              let vatTotal = 0
              item.priceQuote.priceQuoteTaxes.forEach(priceQuoteTaxe => {
                vatTotal += priceQuoteTaxe.TotalVAT * 1
                //  html += `<td class="col-2 ts elem">TVA: ` + priceQuoteTaxe.VAT + `%</td>`
                html += `<td class="col-2 elem">` + Math.round(priceQuoteTaxe.TotalVAT) + `€</td>`
                //  html += `<td class="col-2 elem">` + priceQuoteTaxe.VAT + priceQuoteTaxe.TotalVAT / (priceQuoteTaxe.VAT /100) + `€</td>`
              })
              html += `
                             <td class="col-2 elem"><b>` + Math.round(vatTotal) + `€</b></td>
                           </tr>

                           <tr class="cobo">
                           <td class="col-6 alright ts"><b>TOTAL TTC</b></td>`

              item.priceQuote.priceQuoteTaxes.forEach(priceQuoteTaxe => {
                //  html += `<td class="col-2 ts elem">TVA: ` + priceQuoteTaxe.VAT + `%</td>`
                html += `<td class="col-2 elem">` + Math.round(priceQuoteTaxe.TotalVAT / (priceQuoteTaxe.VAT / 100) + priceQuoteTaxe.TotalVAT * 1) + `€</td>`
              })
              html += `

                           <td class="col-2 elem"><b>` + Math.round(item.priceQuote.priceQuoteWithTaxes) + `€</b></td>

                         </tr>

                     </table>
                     <br>`

              html += `<table class="cobo">

                           <tr class="cobo">
                           <td class="col-6 alright ts">Acompte à la commande 40% </td>
                           <td class="col-6 alright">=40% du total ttc</td>

                           </tr>
                           <tr class="cobo">
                           <td class="col-6 alright ts">Acompte intermédiaire</td>
                           <td class="col-6 alright">sur avancement</td>

                           </tr>

                           <tr class="cobo">
                           <td class="col-6 alright ts"><b>Solde</b></td>
                           <td class="col-6 alright"><b>à la livraison</b></td>


                         </tr>

                     </table>
                     <br>`

              html += `
                     <table>
                       <thead>
                         <tr>
                           <th class="col-3 desc">
                           <p>Entreprise</p>
                                                 <p class="inf2">Lu et approuvé</p>
                                                 <p class="inf2">Le</p>
                           </th>
                           <th class="col-6 nobo"></th>
                           <th class="col-3 desc"><p>Client</p>
                                                 <p class="inf2">Lu et approuvé</p>
                                                 <p class="inf2">Le</p></th>

                         </tr>
                       </thead>
                     </table>
                  <br>

                  <a class="cgv">Ce devis est valable 3 mois. Les prix sont établis sur la base des taux en vigeur à la date de remise de l'offre et toute variation ultérieure de ces taux sera répercutée sur ces prix en application du Code Général des Impôts</a>
                    `

              pdf.create(html, options).toFile('./server/uploads/pdf/' + req.params.quoteId + '.pdf', function(err, resPDF) {
                if (err) {
                  //return res.status(404).json({message: '', err: err})
                } else {

                  res.status(200).json({
                    message: 'Success',
                    item: req.params.quoteId + '.pdf'
                  })
                }
              })

            }
          })
        })

      }
    })
  })

})

router.get('/graph/:year', function(req, res, next) {
  // let searchQuery = {}
  // searchQuery['ownerCompanies'] = req.user.ownerCompanies

  let dateBegin = req.params.year * 1 + '-01-01'
  let dateEnd = req.params.year * 1 + 1 + '-01-01'

  // if (req.query.search)
  //   searchQuery['details.name'] = new RegExp(req.query.search, 'i')
  //
  // if (req.query.idQuote)
  //   searchQuery['quotes'] = mongoose.Types.ObjectId(req.query.idQuote)

  let aggregate = {
    'detail.dateQuote.issueDate': {
      '$gte': new Date(dateBegin),
      '$lt': new Date(dateEnd)
    }
  }

  aggregate.ownerCompanies = req.user.ownerCompanies

  Quote.aggregate({
    $match: aggregate
  }, {
    $group: {
      _id: {
        year: {
          $year: "$detail.dateQuote.issueDate"
        },
        month: {
          $month: "$detail.dateQuote.issueDate"
        },
        //  day: { $dayOfMonth : "$datePaiement" }
      },
      amountTotal: {
        $sum: "$priceQuote.priceQuoteWithoutTaxes"
      }
    }
  }).exec(function(err, item) {
    if (err) {
      return res.status(404).json({message: '', err: err})
    } else {
      res.status(200).json({message: 'Success', item: item})
    }
  })

})

//update
router.put('/:id', function(req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({
      title: 'No rights',
      error: {
        message: 'No rights'
      }
    })
  }
  Quote.findById(({_id: req.params.id}), function(err, item) {
    if (err) {
      return res.status(404).json({message: '', err: err})
    }

    item.clients = req.body.clients
    item.name = req.body.name
    item.typeQuote = req.body.typeQuote
    // item.ownerQuotes = req.body.ownerQuotes
    item.forms = req.body.forms
    item.products = req.body.products
    item.projects = req.body.projects
    item.devisDetails = req.body.devisDetails
    item.priceQuote = req.body.priceQuote
    item.signature = req.body.signature
    item.detail = req.body.detail
    item.statusQuote = req.body.statusQuote
    item.companieClients = req.body.companieClients
    item.quoteNumber = req.body.quoteNumber

    item.save(function(err, result) {
      if (err) {
        return res.status(404).json({message: 'There was an error, please try again', err: err});
      }
      res.status(201).json({message: '', obj: result});
    });
  })
});

//update
router.put('/:id/signature', function(req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write'))
    return res.status(404).json({
      title: 'No rights',
      error: {
        message: 'No rights'
      }
    })

  Quote.findById(({_id: req.params.id}), function(err, item) {
    if (err) {
      return res.status(404).json({message: '', err: err})
    }
    item.signature = req.body.signature
    item.save(function(err, result) {
      if (err) {
        return res.status(404).json({message: 'There was an error, please try again', err: err})
      }
      shared.postNotification(req, 'quote').then(() => {
        res.status(201).json({message: '', obj: result});
      }).catch((error) => {
        return res.status(404).json({message: 'There was an error, please try again', err: err})
      })
    });
  })
});

router.post('/', function(req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({
      title: 'No rights',
      error: {
        message: 'No rights'
      }
    })
  }
  if (!req.user.ownerCompanies.length) {
    return res.status(404).json({message: 'You must belong to a companie', err: ''})
  }

  let searchQuery = {}
  searchQuery['ownerCompanies'] = req.user.ownerCompanies
  Quote.find(searchQuery).count().exec(function(err, count) {
    req.body.quoteNumber = count * 1 + 1
    req.body.projects.forEach(project => req.body.clients = project.clients)

    var quote = new Quote(req.body);
    quote.ownerCompanies = req.user.ownerCompanies

    quote.save(function(err, result) {
      if (err) {
        return res.status(403).json({
          title: 'There was an issue',
          error: {
            message: 'The email you entered already exists'
          }
        });
      }
      res.status(200).json({message: 'Registration Successfull', obj: result})
    })
  })
});

router.post('/saveAsInvoice/', function(req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({
      title: 'No rights',
      error: {
        message: 'No rights'
      }
    })
  }
  if (!req.user.ownerCompanies.length)
    return res.status(404).json({message: 'You must belong to a companie', err: ''})

  let searchQuery = {}
  searchQuery['ownerCompanies'] = req.user.ownerCompanies
  Quote.find(searchQuery).count().exec(function(err, count) {
    req.body.quoteNumber = count * 1 + 1
    req.body.signature = {}
    let idQuote = req.body._id
    delete req.body._id
    var quote = new Quote(req.body);

    quote.typeQuote = 'invoice'
    quote.save(function(err, result) {
      if (err) {
        return res.status(403).json({
          title: 'There was an issue',
          error: {
            message: 'ERROR' + err
          }
        });
      }
      Quote.findById(({_id: idQuote}), function(err, item) {
        if (err)
          return res.status(404).json({message: '', err: err})
        item.invoices = result
        item.save(function(err, resultQuote) {
          if (err) {
            return res.status(404).json({message: 'There was an error, please try again', err: err});
          }
          res.status(201).json({message: '', obj: result});
        });
      })
    })
  })
});

// get all forms from database
router.get('/page/:page', function(req, res, next) {
  var itemsPerPage = 15
  var currentPage = Number(req.params.page)
  var pageNumber = currentPage - 1
  var skip = (itemsPerPage * pageNumber)
  //var limit = (itemsPerPage * pageNumber) + itemsPerPage

  let nameQuery = {}
  let cityQuery = {}
  let arrObj = []

  let searchQuery = {}
  searchQuery['ownerCompanies'] = req.user.ownerCompanies

  // if (req.query.isQuoteAssignedToMe === 'true') {
  //   searchQuery['clients'] = req.user._id
  // } else {
  //   searchQuery['ownerCompanies'] = req.user.ownerCompanies
  // }
  if (req.query.typeQuote)
    searchQuery['typeQuote'] = req.query.typeQuote

  if (req.query.search) {
    //  nameQuery['name'] = new RegExp(req.query.search, 'i')
    //  cityQuery['address.city'] = new RegExp(req.query.search, 'i')
    arrObj.push({
      'name': new RegExp(req.query.search, 'i')
    })
    // arrObj.push({
    //   'quoteNumber': new RegExp(req.query.search, 'i')
    // })
    // arrObj.push({
    //   'address.address': new RegExp(req.query.search, 'i')
    // })
    searchQuery['$or'] = arrObj
    //findQuery['address.city'] = new RegExp(req.query.search, 'i')
  }

  if (req.query.userId)
    searchQuery['clients'] = mongoose.Types.ObjectId(req.query.userId)

  if (req.query.projectId)
    searchQuery['projects'] = mongoose.Types.ObjectId(req.query.projectId)

  Quote.find(searchQuery).populate({path: 'clients', model: 'User'})

  // .populate({path: 'devisDetails.bucketProducts.productInit', model: 'Product'})
    .limit(itemsPerPage).skip(skip).sort(req.query.orderBy).exec(function(err, item) {
    if (err) {
      return res.status(404).json({message: 'No results', err: err})
    } else {
      Quote.find(searchQuery).count().exec(function(err, count) {
        res.status(200).json({
          paginationData: {
            totalItems: count,
            currentPage: currentPage,
            itemsPerPage: itemsPerPage
          },
          data: item
        })
      })
    }
  })
})

router.delete('/:id', function(req, res, next) {
  if (!shared.isCurentUserHasAccess(req.user, nameObject, 'write')) {
    return res.status(404).json({
      title: 'No rights',
      error: {
        message: 'No rights'
      }
    })
  }
  Quote.findById((req.params.id), function(err, item) {

    if (err) {
      return res.status(500).json({message: 'An error occured', err: err})
    }
    if (!item) {
      return res.status(404).json({
        title: 'No form found',
        error: {
          message: 'Form not found!'
        }
      });
    }

    // deleting the form from the database
    item.remove(function(err, result) {
      if (err) {
        return res.status(500).json({title: 'An error occured', error: err});
      }
      res.status(200).json({message: 'Item is deleted', obj: result});
    })
  });
});

module.exports = router;
