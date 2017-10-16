import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {PaiementQuoteService} from '../paiementQuote.service';
import {PaiementService} from '../paiement.service';


import {ProductService} from '../../product/product.service';
import { ProjectService} from '../../project/project.service';


import {PaiementQuote, StripeCustomer, DataSource} from '../paiementQuote.model';

import {ToastsManager} from 'ng2-toastr';

import {MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup} from '@angular/forms';
import { UserService} from '../../user/user.service';
import { QuoteService } from '../../quote/quote.service';
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';
import { Quote } from '../../quote/quote.model';
import { Product } from '../../product/product.model';
import { Project } from '../../project/project.model';
import { Search} from '../../shared/shared.model'





@Component({
  selector: 'app-paiementQuote',
  templateUrl: './editPaiementQuote.component.html',
  styleUrls: ['../paiementQuote.component.css'],
})
export class EditPaiementQuoteComponent implements OnInit {
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Input() fetchedQuotes: Quote[] = []
  @Input() search: Search = new Search()

  showPaiements: boolean = false
  fetchedPaiementQuote: PaiementQuote = new PaiementQuote()
  autocompleteUser: string = '';
  autocompleteProject: string = '';
  fetchedProducts: Product[] = []
  fetchedProjects: Project[] = []
  stripeCust: StripeCustomer = new StripeCustomer()
  // currentUser: User = new User()
  imgLogoUrl: string = './assets/images/profile-placeholder.jpg'
  imgSignatureBase64Temp = ''

  showReLoginInApp:boolean = false
  newCard: DataSource = new DataSource()
  // userAdmins : User[] = []
  // userManagers : User[] = []
  // userClients : User[] = []
  // usersSalesRep : User[] = []
  // userStylists : User[] = []

  myForm: FormGroup;
  autocompleteProduct: String = ''
  fetchedUsers: User[] = [];
  arrayContentToSearch =[]

  paiementsTypes = [
    { label: 'cheque', value: 'check' },
    { label: 'Espece', value: 'cash' },
    // { label: 'Stripe', value: 'stripe' },
]
  constructor(
    private paiementQuoteService: PaiementQuoteService,
    private paiementService: PaiementService,
    private quoteService: QuoteService,
    // private projectService: ProjectService,
    // private userService: UserService,
    // private productService: ProductService,
//    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit() {

    console.log(this.fetchedPaiementQuote)
    // this.fetchedPaiementQuote.quotes = this.fetchedQuotes
    this.myForm = this._fb.group({
      amount: [''],
      type: [''],
      datePaiement: [ null, []],
    })

    this.fetchedPaiementQuote
    .datePaiementString =
    this.authService
    .isoDateToHtmlDate(this.fetchedPaiementQuote.datePaiement)

    // this.fetchedPaiementQuote.isExpense = this.search.isExpense
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['isExpense']) {this.fetchedPaiementQuote.isExpense = true}
      if(params['isGooplusPaiement']) {this.fetchedPaiementQuote.isGooplusPaiement = true}
      if(params['idPaiementQuote']) {this.getPaiementQuote(params['idPaiementQuote'])}
      if(params['idQuote']) {this.getQuote(params['idQuote'])}

    })
  }


    selectQuote(quote: Quote) {
      this.fetchedPaiementQuote.quotes = [quote]
    }
    selectProject(project: Project) {
      this.fetchedPaiementQuote.projects = [project]
    }
    selectUserDebited(user: User) {
      this.fetchedPaiementQuote.userDebiteds = [user]
    }

    getQuote(idQuote: string) {
      this.quoteService.getQuote(idQuote)
        .subscribe(
          res => {
            this.fetchedPaiementQuote.quotes = [res]
          },
          error => { console.log(error) }
        )
    }

  save() {
    let this2=this
    return new Promise(function(resolve, reject) {
      this2.fetchedPaiementQuote
      .datePaiement = this2.authService
      .HTMLDatetoIsoDate(this2.fetchedPaiementQuote.datePaiementString)

      if(this2.fetchedPaiementQuote._id) {
        this2.paiementQuoteService.updatePaiementQuote(this2.fetchedPaiementQuote)
          .subscribe(
            res => {
              this2.toastr.success('Great!', res.message)
              this2.saved.emit()
              this2.getPaiementQuote(res.obj._id)
              resolve(true)
              //this.router.navigate(['paiementQuote/edit/' + this.fetchedPaiementQuote._id])
            },
            error => {
              reject(true)
              this2.toastr.error('error!', error)
            }
          )
      } else {
        this2.paiementQuoteService.savePaiementQuote(this2.fetchedPaiementQuote)
          .subscribe(
            res => {
              this2.toastr.success('Great!', res.message)
              this2.saved.emit()
              this2.getPaiementQuote(res.obj._id)
              // if(this.showHeader)
              //   this.router.navigate(['paiementQuote/edit/' + res.obj._id])
            },
            error => {console.log(error)}
          )
      }

    })
  }







  goBack() {
    this.location.back();
  }





  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.paiementQuoteService.deletePaiementQuote(id)
        .subscribe(
          res => {
            this2.toastr.success('Great!', res.message);
            resolve(res)
          },
          error => {
            console.log(error);
            reject(error)
          }
        )
      })
  }


  openDialogDelete(){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.fetchedPaiementQuote._id).then(function(){
          this2.router.navigate(['paiementQuote']);
        })

      }
    })
  }




  getPaiementQuote(id: string) {
    this.paiementQuoteService.getPaiementQuote(id, {})
      .subscribe(
        res => {
          this.fetchedPaiementQuote = res
          if(this.fetchedPaiementQuote.type === 'stripe')
            this.getStripeCust()

          this.fetchedPaiementQuote
          .datePaiementString =
          this.authService
          .isoDateToHtmlDate(this.fetchedPaiementQuote.datePaiement)
        },
        error => {
          console.log(error);
        }
      )
  }
  // isAdmin() {
  //   return this.authService.isAdmin();
  // }



    getStripeCust() {
      this.paiementService.getStripeCust(this.fetchedPaiementQuote._id)
        .subscribe(
          res => {
            // console.log(res)

            this.stripeCust = res.customer


          },
          error => {
            this.stripeCust = new StripeCustomer()
            console.log(error)
          }
        )
    }

    payInStripe(amount) {
        this.save().then(() => {

          let dataPayInStripe = {
            amount: amount
          }
          console.log(dataPayInStripe)
          this.paiementService.payInStripe(this.fetchedPaiementQuote._id, dataPayInStripe)
            .subscribe(
              res => {
                // this.userService.cleanCurrentUserInSession()
                this.toastr.success('Great!')
                // this.getStripeCust()
                this.getPaiementQuote(this.fetchedPaiementQuote._id)
                // console.log(res);
              },
              error => { console.log(error); }
            );
        })
        .catch(err => {
          console.log(err)
        })
    }

    deleteCustInStripe() {
      this.paiementService.deleteCustInStripe(this.fetchedPaiementQuote._id)
        .subscribe(
          res => {
            // this.userService.cleanCurrentUserInSession()
            this.toastr.success('Great!')
            this.getStripeCust()
          },
          error => { console.log(error); }
        );
    }
    saveCustInStripe(){
      this.paiementService.saveCustInStripe(this.fetchedPaiementQuote)
        .subscribe(
          res => {
            // this.userService.cleanCurrentUserInSession()
            this.toastr.success('Great!')
            this.stripeCust = res.customer
            console.log(res);
          },
          error => { console.log(error); }
        );
    }
    saveCardInStripe() {
      // console.log(this.newCard)
      this.paiementService.saveCardInStripe(this.newCard, this.fetchedPaiementQuote._id)
        .subscribe(
          res => {
            // this.userService.cleanCurrentUserInSession()
            this.toastr.success('Great!')
            this.getStripeCust()
            // console.log(res);
          },
          error => { console.log(error); }
        );
    }
    saveSubscriptionInStripe(planValue) {
      let plan = {
        plan: planValue
      }
      this.paiementService.saveSubscriptionInStripe(plan, this.fetchedPaiementQuote._id)
        .subscribe(
          res => {
            // this.userService.cleanCurrentUserInSession()
            this.toastr.success('Great!')
            this.getStripeCust()
            this.showReLoginInApp = true


            // this.getStripeCust()
            // this.authService.refreshCookiesOfCurrentUser()
            // location.reload();
            // console.log(res);
          },
          error => { console.log(error); }
        );
    }


    deleteSubInStripe(subId){
      this.paiementService.deleteSub(subId)
        .subscribe(
          res => {
            // this.userService.cleanCurrentUserInSession()
            // console.log(res.message)
            this.toastr.success('Great!');
            this.getStripeCust()
            // this.getStripeCust()
            // location.reload();
          },
          error => {
            console.log(error);
          }
        );
    }

    deleteCardInStripe(cardId){
      this.paiementService.deleteCard(cardId, this.fetchedPaiementQuote._id)
        .subscribe(
          res => {
            // this.userService.cleanCurrentUserInSession()
            this.toastr.success('Great!');
            this.getStripeCust()
          },
          error => {
            console.log(error);
          }
        );
    }




}
