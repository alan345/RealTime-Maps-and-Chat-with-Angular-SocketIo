import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService} from '../user/user.service';
import { CompanieService} from '../companie/companie.service';
import { CategorieService} from '../categorie/categorie.service';
// import { QuoteService} from '../quote/quote.service';
// import { TemplateQuoteService} from '../quote/templateQuote.service';

import { RightService} from '../right/right.service';
import { ProjectService} from '../project/project.service';
import { StratService} from '../strat/strat.service';
import { MissionService} from '../mission/mission.service';
import { DocumentService} from '../document/document.service';
import { BriefService} from '../brief/brief.service';
import { MatDialog } from '@angular/material';
import { Search} from '../home/home.model'
// import { UserDialogComponent } from '../user/singleUser/dialog/userDialog.component';
// import { CompanieDialogComponent } from '../companie/single/dialog/companieDialog.component';
// import { ProjectDialogComponent } from '../project/single/dialog/projectDialog.component';
import { ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import { User } from '../user/user.model';
// // import { Quote } from '../quote/quote.model';


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  @Input() typeAutocomplete: string;
  // @Input() showIfNoDataInit: boolean = true;
  @Input() arrayContent = [];
  @Input() singleChoice: boolean = true;
  @Input() title: string = '';
  @Input() search: Search = new Search();
  @Input() canDelete: boolean = true;
  @Input() enableLink: boolean = true;
  // createNewItem: boolean = false;
  autocompleteSearch = ''
  fetchedData: User[] = [];


  @Output() getResultAutocomplete: EventEmitter<any> = new EventEmitter();
  @Output() clearAutocomplete: EventEmitter<any> = new EventEmitter();

  constructor(
    // public dialog: MatDialog,
    private userService: UserService,
    private documentService: DocumentService,
    private missionService: MissionService,
    private companieService: CompanieService,
    private briefService: BriefService,
    private categorieService: CategorieService,
    private toastr: ToastsManager,
    // // private quoteService: QuoteService,
    private stratService: StratService,
    private projectService: ProjectService,
    // private templateQuoteService: TemplateQuoteService,
    private rightService: RightService,
    private router: Router,
  ) {}

  ngOnInit() {}
  ngOnChanges() {
    if(this.typeAutocomplete ==='project' && this.search.projectId)
        this.projectService.getProject(this.search.projectId)
        .subscribe( res => { if(this.arrayContent.length) this.arrayContent.splice(0, 1);
          this.arrayContent.push(res) }, error => { console.log(error); });

    if(this.typeAutocomplete ==='categorie' && this.search.categorieId)
        this.categorieService.getCategorie(this.search.categorieId)
        .subscribe( res => { if(this.arrayContent.length) this.arrayContent.splice(0, 1);
          this.arrayContent.push(res) }, error => { console.log(error); });


    if(this.typeAutocomplete ==='strat' && this.search.stratId)
        this.stratService.getStrat(this.search.stratId)
        .subscribe( res => { if(this.arrayContent.length) this.arrayContent.splice(0, 1);
          this.arrayContent.push(res) }, error => { console.log(error); });


    if(this.typeAutocomplete ==='mission' && this.search.missionId)
        this.missionService.getMission(this.search.missionId)
        .subscribe( res => { if(this.arrayContent.length) this.arrayContent.splice(0, 1);
          this.arrayContent.push(res) }, error => { console.log(error); });

    if(this.typeAutocomplete ==='document' && this.search.documentId)
        this.documentService.getDocument(this.search.documentId)
        .subscribe( res => { if(this.arrayContent.length) this.arrayContent.splice(0, 1);
          this.arrayContent.push(res) }, error => { console.log(error); });

    if(this.typeAutocomplete ==='brief' && this.search.briefId)
        this.briefService.getBrief(this.search.briefId)
        .subscribe( res => { if(this.arrayContent.length) this.arrayContent.splice(0, 1);
          this.arrayContent.push(res) }, error => { console.log(error); });


  }

  getData(page: number, search: any) {

    if(this.typeAutocomplete ==='user')
      this.userService.getUsers(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });

    if(this.typeAutocomplete ==='companie')
      this.companieService.getCompanies(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });

    if(this.typeAutocomplete ==='categorie')
      this.categorieService.getCategories(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });

    if(this.typeAutocomplete ==='document')
      this.documentService.getDocuments(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });

    if(this.typeAutocomplete ==='project')
      this.projectService.getProjects(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });


    // if(this.typeAutocomplete ==='templateQuote')
    //   this.templateQuoteService.getTemplateQuotes(page, search)
    //   .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });

    if(this.typeAutocomplete ==='right')
      this.rightService.getRights(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });

    if(this.typeAutocomplete ==='strat')
      this.stratService.getStrats(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });


    if(this.typeAutocomplete ==='mission')
      this.missionService.getMissions(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });

    if(this.typeAutocomplete ==='brief')
      this.briefService.getBriefs(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });


  }


  emailValidator(emailText: any) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (EMAIL_REGEXP.test(emailText))
      return true
    return false
  }


  createObj(typeObj: string) {

    if(typeObj === 'user') {

      if(!this.emailValidator(this.autocompleteSearch)) {
        this.toastr.error('Error! Not valid email')
        return
      }


      let newUser = new User()
      newUser.email = this.autocompleteSearch
      this.userService.saveUser(newUser)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            // this.fetchedUser = res.obj
            this.selectData(res.obj)
          },
          error => {
            console.log(error)
            this.toastr.error('Error!')
          }
        );
    }
  }

  // removeDataFromDb(id: string) {
  //   if(this.typeAutocomplete ==='templateQuote')
  //     this.templateQuoteService.deleteTemplateQuote(id)
  //     .subscribe( res => {
  //       console.log(res);
  //       this.searchData()
  //     }, error => { console.log(error); });
  //
  // }
  //
  // openDialog(typeObj: string) {
  //   let dialogComp: any
  //   if(typeObj == 'user')
  //     dialogComp = UserDialogComponent
  //
  //   if(typeObj == 'companie')
  //     dialogComp = CompanieDialogComponent
  //
  //   if(typeObj == 'project')
  //     dialogComp = ProjectDialogComponent
  //
  //
  //   let dialogRef = this.dialog.open(dialogComp, {
  //     height: '500px'
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result)
  //     this.autocompleteSearch = ''
  //     // if(result) {
  //     //   console.log(result)
  //     //   this.fetchedProject.forms.push( result)
  //     // }
  //   })
  // }

  saved(result) {
    if(result)
      this.arrayContent = [result]
  }

  selectData(data) {
    this.autocompleteSearch = ''
    this.fetchedData = []
    this.arrayContent.push(data)
    this.getResultAutocomplete.emit(this.arrayContent)
  }
  searchData() {
    if (!this.autocompleteSearch) {
      this.fetchedData = []
    } else {
      this.search.search = this.autocompleteSearch,

      this.getData(1, this.search)
    }
  }
  removeData(i: number) {
    this.arrayContent.splice(i, 1);
    this.clearAutocomplete.emit()
  }

  linkToObject(data) {
    if(this.enableLink)
      this.router.navigate([this.typeAutocomplete + '/' + data._id]);
  }


  // createNewItemF(){
  //   this.createNewItem = true
  // }
}
