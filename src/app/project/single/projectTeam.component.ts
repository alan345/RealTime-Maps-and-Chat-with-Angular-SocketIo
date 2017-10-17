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
  selector: 'app-projectTeam',
  templateUrl: './projectTeam.component.html',
  styleUrls: ['../project.component.css'],

})

export class ProjectTeamComponent implements OnInit {

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


  status = StatusProject
  categ: string = 'Electricité';
  subCateg: string = 'file';
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
    });


    this.fetchedProject.dateProject.startString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.start)
    this.fetchedProject.dateProject.endString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.end)

    if(this.search.projectId)
      this.getProject(this.search.projectId)

  }



  save() {

    this.fetchedProject.dateProject.start = this.authService.HTMLDatetoIsoDate(this.fetchedProject.dateProject.startString)
    this.fetchedProject.dateProject.end = this.authService.HTMLDatetoIsoDate(this.fetchedProject.dateProject.endString)


    if(this.fetchedProject._id) {
      this.projectService.updateProject(this.fetchedProject)
        .subscribe(
          res => {

            this.toastr.success('Great!', res.message)
            // this.getProject(res.obj._id)
            // this.saved.emit(res.obj)
            this.closeRight()
            this.globalEventsManager.refreshCenter(true);
            // this.router.navigate(['project/' + res.obj._id]);
          },
          error => {console.log(error)}
        );
    } else {
      this.projectService.saveProject(this.fetchedProject)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            // this.fetchedProject = res.obj
            // this.getProject(res.obj._id)
            this.closeRight()
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



  openDeleteConfirmation(){
      let newShowNavBarData = new ShowNavBarData()
      newShowNavBarData.search.typeScreen = 'deleteConfirmation'
      newShowNavBarData.search.typeObj = 'project'
      newShowNavBarData.search.projectId = this.fetchedProject._id
      this.globalEventsManager.showNavBarRight(newShowNavBarData)

    //   let newShowNavBarData = new ShowNavBarData()
    //   newShowNavBarData.showNavBar = true
    //   newShowNavBarData.search.typeObj = 'document'
    //   this.globalEventsManager.showNavBarRight(newShowNavBarData)
    // let this2 = this
    // let dialogRefDelete = this.dialog.open(DeleteDialog)
    // dialogRefDelete.afterClosed().subscribe(result => {
    //   if(result) {
    //     this.onDelete(this.fetchedProject._id).then(function(){
    //       // this2.router.navigate(['user']);
    //       // this2.goBack();
    //     })
    //
    //   }
    // })
  }


  //
  // refreshHardCategories(){
  //   this.categoriesHard2.forEach((HardCategorie, indexHard) => {
  //     this.categoriesHard2[indexHard].selected = false
  //   })
  //
  //   this.categoriesHard2.forEach((HardCategorie, indexHard) => {
  //     this.fetchedProject.categories.forEach((fetchedCategorie, indexFetched) => {
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
  //     this.fetchedProject.categories.forEach((fetchedCategorie, indexFetched) => {
  //       if(HardCategorie.name == fetchedCategorie.name) {
  //         this.categoriesHard1[indexHard].selected = true
  //       }
  //     })
  //   })
  // }




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


  // onDelete(id: string) {
  //   let this2 = this
  //   return new Promise(function(resolve, reject) {
  //     this2.projectService.deleteProject(id)
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
