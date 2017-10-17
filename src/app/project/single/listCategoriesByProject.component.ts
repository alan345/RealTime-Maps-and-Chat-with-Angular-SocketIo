import { Component, OnInit, Input} from '@angular/core';
import { ProjectService} from '../project.service';
import { ToastsManager} from 'ng2-toastr';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Project} from '../project.model';
// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';
import { FormBuilder} from '@angular/forms';



// import { Categorie } from '../../categorie/categorie.model';
// import {CategorieService} from '../../categorie/categorie.service';

import { AuthService} from '../../auth/auth.service';
import {Search} from '../../home/home.model';
import {GlobalEventsManager} from '../../globalEventsManager';
import {ShowNavBarData} from '../../home/home.model';



@Component({
  selector: 'app-listCategoriesByProject',
  templateUrl: './listCategoriesByProject.component.html',
  styleUrls: ['../project.component.css'],

})

export class ListCategoriesByProjectComponent implements OnInit {

  // @Input() showBackButton: Boolean = true;
  // @Output() saved: EventEmitter<any> = new EventEmitter();
  @Input() search: Search = new Search();

  searchMissionStrat: Search = new Search();
  searchMissionContent: Search = new Search();
  searchMissionResearch: Search = new Search();


  // fetchedCategories: Categorie[] = []
  //
  // status = StatusProject
  // categ: string = 'Electricité';
  // subCateg: string = 'file';
  // autocompleteUser: string = '';
  // autocompleteQuote: string = '';
  // fetchedUsers: User[] = [];
  // fetchedQuotes: Quote[] = [];
  // showNavBarData: ShowNavBarData = new ShowNavBarData()

  fetchedProject: Project = new Project();


  // public myForm: FormGroup;

  constructor(
    private globalEventsManager: GlobalEventsManager,
    // private sanitizer: DomSanitizer,
    private projectService: ProjectService,
    private toastr: ToastsManager,
    // // public dialog: MatDialog,
    private router: Router,
    private location: Location,
    // private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    // private categorieService: CategorieService,
    // // private quoteService: QuoteService,
    private authService: AuthService,
  ) {
    // this.globalEventsManager.refreshCenterEmitter.subscribe((isRefresh) => {
    //     if(isRefresh)
    //       this.getProject(this.fetchedProject._id)
    // })
  }





  ngOnInit() {

    // this.getCategories(1, {})
    // this.myForm = this._fb.group({
    //   status: [''],
    //   name: ['', [Validators.required, Validators.minLength(2)]],
    //   description: [''],
    // });

    //
    // this.fetchedProject.dateProject.startString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.start)
    // this.fetchedProject.dateProject.endString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.end)

    if(this.search.projectId)
      this.getProject(this.search.projectId)

    //
    // this.activatedRoute.params.subscribe((params: Params) => {
    //
    // })

  }



  openDetails() {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = true
    showNavBarData.search.typeObj = 'project'
    showNavBarData.search.projectId = this.fetchedProject._id
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }
  openTeam() {
    let showNavBarData = new ShowNavBarData()
    showNavBarData.showNavBar = true
    showNavBarData.search.typeScreen = 'team'
    showNavBarData.search.typeObj = 'project'
    showNavBarData.search.projectId = this.fetchedProject._id
    this.globalEventsManager.showNavBarRight(showNavBarData);
  }





  getProject(id: string) {
    this.projectService.getProject(id)
      .subscribe(
        res => {
          this.fetchedProject = <Project>res

          this.fetchedProject.dateProject.startString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.start)
          this.fetchedProject.dateProject.endString = this.authService.isoDateToHtmlDate(this.fetchedProject.dateProject.end)

          this.fetchedProject.dateProject.percentageProgress = this.authService.getPourcentageProgress(this.fetchedProject.dateProject.start, this.fetchedProject.dateProject.end)

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
