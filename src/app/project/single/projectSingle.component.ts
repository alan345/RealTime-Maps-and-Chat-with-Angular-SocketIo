import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ProjectService} from '../project.service';
import { ToastsManager} from 'ng2-toastr';
// import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Project, StatusProject, Log} from '../project.model';
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
import {ShowNavBarData} from '../../home/home.model'
import {GlobalEventsManager} from '../../globalEventsManager';

@Component({
  selector: 'app-projectSingle',
  templateUrl: './projectSingle.component.html',
  styleUrls: ['../project.component.css'],

})

export class ProjectSingleComponent implements OnInit {

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
  //
  //
  // status = StatusProject
  // categ: string = 'Electricité';
  // subCateg: string = 'file';
  // autocompleteUser: string = '';
  // autocompleteQuote: string = '';
  fetchedUsers: User[] = [];
  // fetchedQuotes: Quote[] = [];


  fetchedProject: Project = new Project();


  public myForm: FormGroup;

  constructor(
    private globalEventsManager: GlobalEventsManager,
    // private sanitizer: DomSanitizer,
    private projectService: ProjectService,
    private toastr: ToastsManager,
    // // public dialog: MatDialog,
    // private router: Router,
    // private location: Location,
    // private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    // private userService: UserService,
    // // private quoteService: QuoteService,
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


    this.fetchedProject.dateProject.startString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.start)
    this.fetchedProject.dateProject.endString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.end)

    if(this.search.projectId)
      this.getProject(this.search.projectId)
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   if(params['id']) {
    //     this.search.projectId = params['id']
    //     this.getProject(params['id'])
    //   } else {
    //     if(params['idClient'])
    //        this.getUser(params['idClient'])
    //     if(params['selectedIndex'])
    //       this.selectedIndex0 = params['selectedIndex']
    //
    //       this.getItemSteps()
    //   }
    // })

  }

  // getItemSteps() {
  //   let currentUser = this.authService.getCurrentUser()
  //
  //   currentUser.ownerCompanies.forEach((companie, index) => {
  //
  //     if(this.selectedIndex0 >= companie.categories.categProject.length)
  //       this.selectedIndex0 = -1
  //
  //
  //     // console.log(JSON.parse(currentUser.companies[index].categJson.categProject))
  //     if(currentUser.ownerCompanies[index].categories.categProject)
  //       this.itemSteps = currentUser.ownerCompanies[index].categories.categProject
  //   })
  // }




  //
  // addCalendar() {
  //   let queryParams = {}
  //   // queryParams['new'] = true
  //   queryParams['showCreateEvent'] = true
  //   queryParams['showSearchEvent'] = false
  //
  //
  //   // if(this.fetchedProject.assignedTos.length) {queryParams['idUserNew'] = this.fetchedProject.assignedTos[0]._id}
  //   if(this.fetchedProject._id) {queryParams['idProjectNew'] = this.fetchedProject._id}
  //   if(this.fetchedProject.clients.length) {queryParams['idClientNew'] = this.fetchedProject.clients[0]._id }
  //   // if(this.fetchedProject.assignedTos.length)  {queryParams['idUserSearch'] = this.fetchedProject.assignedTos[0]._id }
  //   if(this.fetchedProject._id) {queryParams['idProjectSearch'] = this.fetchedProject._id}
  //
  //   this.router.navigate(['userCalendar/', queryParams])
  // }
  // seeCalendar() {
  //   let queryParams = {}
  //   // queryParams['showCreateEvent'] = true
  //   queryParams['showSearchEvent'] = false
  //
  //   // if(this.fetchedProject.assignedTos.length)  {queryParams['idUserSearch'] = this.fetchedProject.assignedTos[0]._id }
  //   if(this.fetchedProject._id) {queryParams['idProjectSearch'] = this.fetchedProject._id}
  //   // if(this.fetchedProject.clients.length)      {queryParams['idClientSearch'] = this.fetchedProject.clients[0]._id}
  //   this.router.navigate(['userCalendar/', queryParams])
  // }

  // newComment(comment: string) {
  //   // let newLog = new Log()
  //   // newLog.comment = comment
  //   // this.fetchedProject.logs.push(newLog)
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

  // changeCascade(selectedIndex0, selectedIndex1, selectedIndex2) {
  //   this.selectedIndex0 = selectedIndex0
  //   this.selectedIndex1 = selectedIndex1
  //   this.selectedIndex2 = selectedIndex2
  // }
  // addQuote(){
  // }


  // autocomplete user
  // selectUser(user: User) {
  //   // this.autocompleteUser=''
  //   // this.fetchedUsers = []
  //   this.fetchedProject.clients = [user]
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
  //   // this.fetchedProject.forms.splice(i, 1);
  // }



    // autocomplete AssignedTo
    // autocompleteAssignedTo: string = '';
    // fetchedAssignedTos: User[] = [];
    // selectAssignedTo(user: User) {
    //   // this.autocompleteAssignedTo=''
    //   // this.fetchedAssignedTos = []
    //   // this.fetchedProject.assignedTos = [user]
    // }




  //
  // goBack() {
  //   this.location.back();
  // }

  //
  // openDialog(positionImage: string) {
  //   // let dialogRef = this.dialog.open(EditOptionsComponentDialog);
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   if(result) {
  //   //     console.log(result)
  //   //     // this.fetchedProject.forms.push( result)
  //   //   }
  //   // })
  // }


  save() {

    this.fetchedProject.dateProject.start = this.authService.HTMLDatetoIsoDate(this.fetchedProject.dateProject.startString)
    this.fetchedProject.dateProject.end = this.authService.HTMLDatetoIsoDate(this.fetchedProject.dateProject.endString)

    if(this.fetchedProject._id) {
      this.projectService.updateProject(this.fetchedProject)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.closeRight()
            // this.getProject(res.obj._id)
            this.globalEventsManager.refreshCenter(true);
          },
          error => {console.log(error)}
        );
    } else {
      this.projectService.saveProject(this.fetchedProject)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.closeRight()
            // this.fetchedProject = res.obj
            // this.getProject(res.obj._id)
            // this.saved.emit(res.obj)
            this.globalEventsManager.refreshCenter(true);
            // this.router.navigate(['project/' + res.obj._id]);
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
      newShowNavBarData.search.typeObj = 'project'
      newShowNavBarData.search.projectId = this.fetchedProject._id
      this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }






  getProject(id: string) {
    this.projectService.getProject(id)
      .subscribe(
        res => {
          // let categName0 = ''
          // let categName1 = ''
          // let categName2 = ''
          this.fetchedProject = <Project>res
          // console.log(this.fetchedProject.categorie)
          // if(this.fetchedProject.categorie.categ0.length)
          //   categName0 = this.fetchedProject.categorie.categ0[0].name
          // if(this.fetchedProject.categorie.categ1.length)
          //   categName1 = this.fetchedProject.categorie.categ1[0].name
          // if(this.fetchedProject.categorie.categ2.length)
          //   categName2 = this.fetchedProject.categorie.categ2[0].name
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


          this.fetchedProject.dateProject.startString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.start)
          this.fetchedProject.dateProject.endString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.end)



        },
        error => {
          console.log(error);
        }
      )
  }




}
