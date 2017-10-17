import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { BriefService} from '../brief.service';
import { ToastsManager} from 'ng2-toastr';
// import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Brief, StatusBrief, Log} from '../brief.model';
// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
// import { DeleteDialog } from '../../deleteDialog/deleteDialog.component'
import { UserService} from '../../user/user.service';
// import { QuoteService} from '../../quote/quote.service';

import { User } from '../../user/user.model';
// import { Quote } from '../../quote/quote.model';
import { AuthService} from '../../auth/auth.service';
import {Search} from '../../home/home.model'
import {GlobalEventsManager} from '../../globalEventsManager';
import {ShowNavBarData} from '../../home/home.model'


@Component({
  selector: 'app-brief',
  templateUrl: './briefSingle.component.html',
  styleUrls: ['../brief.component.css'],

})

export class BriefSingleComponent implements OnInit {

  @Input() showBackButton: Boolean = true;
  @Output() saved: EventEmitter<any> = new EventEmitter();

  @Input() search: Search = new Search()

  // selectedIndex0: number = -1
  // selectedIndex1: number = -1
  // selectedIndex2: number = -1
  // show1 = false
  // show2 = false
  // categ0: string = '';
  // categ1: string = '';
  // categ2: string = '';

  // itemSteps:any =[];


  status = StatusBrief
  categ: string = 'Electricité';
  subCateg: string = 'file';
  // autocompleteUser: string = '';
  // autocompleteQuote: string = '';
  fetchedUsers: User[] = [];
  // fetchedQuotes: Quote[] = [];


  fetchedBrief: Brief = new Brief();


  public myForm: FormGroup;

  constructor(
    private globalEventsManager: GlobalEventsManager,
    private sanitizer: DomSanitizer,
    private briefService: BriefService,
    private toastr: ToastsManager,
    // public dialog: MatDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private userService: UserService,
    // private quoteService: QuoteService,
    private authService: AuthService,
  ) {
  }





  ngOnInit() {
    this.myForm = this._fb.group({
      status: [''],
      start: [''],
      end: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
    });


    this.fetchedBrief.dateBrief.startString = this.authService.isoDateToHtmlDate(this.fetchedBrief.dateBrief.start)
    this.fetchedBrief.dateBrief.endString = this.authService.isoDateToHtmlDate(this.fetchedBrief.dateBrief.end)




    if(this.search.briefId)
      this.getBrief(this.search.briefId)
    this.activatedRoute.params.subscribe((params: Params) => {

      if (this.search.briefId) {
        this.getBrief(this.search.briefId)
      } else if(params['id']) {
          this.getBrief(params['id'])
      }

    //   if(params['id']) {
    //     this.search.briefId = params['id']
    //     this.getBrief(params['id'])
    //   } else {
    //     if(params['idClient'])
    //        this.getUser(params['idClient'])
    //     if(params['selectedIndex'])
    //       this.selectedIndex0 = params['selectedIndex']
    //
    //       this.getItemSteps()
    //   }
    })

  }
  //
  // getItemSteps() {
  //   let currentUser = this.authService.getCurrentUser()
  //
  //   currentUser.ownerCompanies.forEach((companie, index) => {
  //
  //     if(this.selectedIndex0 >= companie.categories.categBrief.length)
  //       this.selectedIndex0 = -1
  //
  //
  //     // console.log(JSON.parse(currentUser.companies[index].categJson.categBrief))
  //     if(currentUser.ownerCompanies[index].categories.categBrief)
  //       this.itemSteps = currentUser.ownerCompanies[index].categories.categBrief
  //   })
  // }





  addCalendar() {
    let queryParams = {}
    // queryParams['new'] = true
    queryParams['showCreateEvent'] = true
    queryParams['showSearchEvent'] = false


    // if(this.fetchedBrief.assignedTos.length) {queryParams['idUserNew'] = this.fetchedBrief.assignedTos[0]._id}
    if(this.fetchedBrief._id) {queryParams['idBriefNew'] = this.fetchedBrief._id}
    if(this.fetchedBrief.clients.length) {queryParams['idClientNew'] = this.fetchedBrief.clients[0]._id }
    // if(this.fetchedBrief.assignedTos.length)  {queryParams['idUserSearch'] = this.fetchedBrief.assignedTos[0]._id }
    if(this.fetchedBrief._id) {queryParams['idBriefSearch'] = this.fetchedBrief._id}

    this.router.navigate(['userCalendar/', queryParams])
  }
  seeCalendar() {
    let queryParams = {}
    // queryParams['showCreateEvent'] = true
    queryParams['showSearchEvent'] = false

    // if(this.fetchedBrief.assignedTos.length)  {queryParams['idUserSearch'] = this.fetchedBrief.assignedTos[0]._id }
    if(this.fetchedBrief._id) {queryParams['idBriefSearch'] = this.fetchedBrief._id}
    // if(this.fetchedBrief.clients.length)      {queryParams['idClientSearch'] = this.fetchedBrief.clients[0]._id}
    this.router.navigate(['userCalendar/', queryParams])
  }
  //
  // newComment(comment: string) {
  //   // let newLog = new Log()
  //   // newLog.comment = comment
  //   // this.fetchedBrief.logs.push(newLog)
  // }
  // getUser(id: string) {
  //   this.userService.getUser(id)
  //     .subscribe(
  //       res => {
  //         //this.fetchedUsers[0] = res.user
  //         this.selectUser(res)
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }
  //
  // changeCascade(selectedIndex0, selectedIndex1, selectedIndex2) {
  //   this.selectedIndex0 = selectedIndex0
  //   this.selectedIndex1 = selectedIndex1
  //   this.selectedIndex2 = selectedIndex2
  // }
  // addQuote(){
  // }


  // // autocomplete user
  // selectUser(user: User) {
  //   // this.autocompleteUser=''
  //   // this.fetchedUsers = []
  //   this.fetchedBrief.clients = [user]
  // }
  // searchUsers() {
  //   if(!this.autocompleteUser) {
  //      this.fetchedUsers = []
  //   } else {
  //     let search = {
  //         search: this.autocompleteUser,
  //       };
  //     this.getUsers(1, search)
  //   }
  // }
  // getUsers(page: number, search: any) {
  //   this.userService.getUsers(page, search)
  //     .subscribe(
  //       res => {
  //         this.fetchedUsers = res.data
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }


  // removePic(i) {
  //   // this.fetchedBrief.forms.splice(i, 1);
  // }



    // autocomplete AssignedTo
    // autocompleteAssignedTo: string = '';
    // fetchedAssignedTos: User[] = [];
    // selectAssignedTo(user: User) {
    //   // this.autocompleteAssignedTo=''
    //   // this.fetchedAssignedTos = []
    //   // this.fetchedBrief.assignedTos = [user]
    // }




  //
  // goBack() {
  //   this.location.back();
  // }


  // openDialog(positionImage: string) {
  //   // let dialogRef = this.dialog.open(EditOptionsComponentDialog);
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   if(result) {
  //   //     console.log(result)
  //   //     // this.fetchedBrief.forms.push( result)
  //   //   }
  //   // })
  // }


  save() {

    this.fetchedBrief.dateBrief.start = this.authService.HTMLDatetoIsoDate(this.fetchedBrief.dateBrief.startString)
    this.fetchedBrief.dateBrief.end = this.authService.HTMLDatetoIsoDate(this.fetchedBrief.dateBrief.endString)
    //
    // let categName0 = ''
    // let categName1 = ''
    // let categName2 = ''
    //
    // if(this.selectedIndex0>=0) {categName0 = this.itemSteps[this.selectedIndex0].categ}
    // if(this.selectedIndex1>=0) {categName1 = this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].categ}
    // if(this.selectedIndex2>=0) {categName2 = this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].subCateg[this.selectedIndex2].categ}
    //
    //
    // this.fetchedBrief.categorie.categ0 = [{name: categName0}]
    // this.fetchedBrief.categorie.categ1 = [{name: categName1}]
    // this.fetchedBrief.categorie.categ2 = [{name: categName2}]
    //


    if(this.fetchedBrief._id) {
      this.briefService.updateBrief(this.fetchedBrief)
        .subscribe(
          res => {

            this.toastr.success('Great!', res.message)
            // this.fetchedBrief = res.obj

            this.globalEventsManager.refreshCenter(true);
            this.closeRight()
            // this.router.navigate(['brief/' + res.obj._id]);
          },
          error => {console.log(error)}
        );
    } else {
      this.briefService.saveBrief(this.fetchedBrief)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)

            this.globalEventsManager.refreshCenter(true);
            this.closeRight()
            // this.router.navigate(['brief/' + res.obj._id]);
          },
          error => {
            this.toastr.error('Error!', error.message)
            console.log(error)
          }
        );
    }
  }

  closeRight() {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = false
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }
  openDeleteConfirmation() {
      let newShowNavBarData = new ShowNavBarData()
      newShowNavBarData.search.typeScreen = 'deleteConfirmation'
      newShowNavBarData.search.typeObj = 'brief'
      newShowNavBarData.search.briefId = this.fetchedBrief._id
      this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }

  // openDialogDelete(){
  //   let this2 = this
  //   let dialogRefDelete = this.dialog.open(DeleteDialog)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.onDelete(this.fetchedBrief._id).then(function(){
  //         // this2.router.navigate(['user']);
  //         // this2.goBack();
  //       })
  //
  //     }
  //   })
  // }


  //
  // refreshHardCategories(){
  //   this.categoriesHard2.forEach((HardCategorie, indexHard) => {
  //     this.categoriesHard2[indexHard].selected = false
  //   })
  //
  //   this.categoriesHard2.forEach((HardCategorie, indexHard) => {
  //     this.fetchedBrief.categories.forEach((fetchedCategorie, indexFetched) => {
  //       if(HardCategorie.name == fetchedCategorie.name) {
  //         this.categoriesHard2[indexHard].selected = true
  //       }
  //     })
  //   })
  //
  //   this.categoriesHard1.forEach((HardCategorie, indexHard) => {
  //     this.categoriesHard1[indexHard].selected = false
  //   })
  //
  //   this.categoriesHard1.forEach((HardCategorie, indexHard) => {
  //     this.fetchedBrief.categories.forEach((fetchedCategorie, indexFetched) => {
  //       if(HardCategorie.name == fetchedCategorie.name) {
  //         this.categoriesHard1[indexHard].selected = true
  //       }
  //     })
  //   })
  // }




  getBrief(id : string) {
    this.briefService.getBrief(id)
      .subscribe(
        res => {
          let categName0 = ''
          let categName1 = ''
          let categName2 = ''
          this.fetchedBrief = <Brief>res
          // // console.log(this.fetchedBrief.categorie)
          // if(this.fetchedBrief.categorie.categ0.length)
          //   categName0 = this.fetchedBrief.categorie.categ0[0].name
          // if(this.fetchedBrief.categorie.categ1.length)
          //   categName1 = this.fetchedBrief.categorie.categ1[0].name
          // if(this.fetchedBrief.categorie.categ2.length)
          //   categName2 = this.fetchedBrief.categorie.categ2[0].name
          //
          // this.itemSteps.forEach((categ0, index) => {
          //   if(categ0.categ === categName0)
          //     this.selectedIndex0 = index
          // })
          //
          // if(this.selectedIndex0 >= 0)
          // this.itemSteps[this.selectedIndex0].subCateg.forEach((categ1,index) => {
          //   if(categ1.categ === categName1)
          //     this.selectedIndex1 = index
          // })
          // if(this.selectedIndex1 >= 0)
          // this.itemSteps[this.selectedIndex0].subCateg[this.selectedIndex1].subCateg.forEach((categ2,index) => {
          //   if(categ2.categ === categName2)
          //     this.selectedIndex2 = index
          // })


          this.fetchedBrief.dateBrief.startString = this.authService.isoDateToHtmlDate(this.fetchedBrief.dateBrief.start)
          this.fetchedBrief.dateBrief.endString = this.authService.isoDateToHtmlDate(this.fetchedBrief.dateBrief.end)



        },
        error => {
          console.log(error);
        }
      )
  }


  // onDelete(id: string) {
  //   let this2 = this
  //   return new Promise(function(resolve, reject) {
  //     this2.briefService.deleteBrief(id)
  //       .subscribe(
  //         res => {
  //           this2.toastr.success('Great!', res.message);
  //           resolve(res)
  //         },
  //         error => {
  //           console.log(error);
  //           reject(error)
  //         }
  //       )
  //     })
  // }


}
