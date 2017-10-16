import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService} from '../user/user.service';
import { CompanieService} from '../companie/companie.service';
import { ProductService} from '../product/product.service';
import { QuoteService} from '../quote/quote.service';
import { TemplateQuoteService} from '../quote/templateQuote.service';

import { RightService} from '../right/right.service';
import { ProjectService} from '../project/project.service';
// import { MatDialog } from '@angular/material';
import {MatDialogModule} from '@angular/material';


// import { UserDialogComponent } from '../user/singleUser/dialog/userDialog.component';
// import { CompanieDialogComponent } from '../companie/single/dialog/companieDialog.component';
// import { ProjectDialogComponent } from '../project/single/dialog/projectDialog.component';

import {Router} from '@angular/router';
import { User } from '../user/user.model';
// import { Quote } from '../quote/quote.model';
import {Search} from '../shared/shared.model'


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent {
  @Input() typeAutocomplete: string;
  @Input() arrayContent = [];
  @Input() singleChoice: boolean = true;
  @Input() title: string = '';
  @Input() search: Search = new Search()
  @Input() canDelete: boolean = true;
  @Input() enableLink: boolean = false;
  @Input() displayIfContentIsNull: boolean = true;
  // createNewItem: boolean = false;
  autocompleteSearch = ''
  fetchedData: User[] = [];

  @Output() getResultAutocomplete: EventEmitter<any> = new EventEmitter();
  @Output() clearAutocomplete: EventEmitter<any> = new EventEmitter();


  constructor(
    public dialog: MatDialogModule,
    private userService: UserService,
    private companieService: CompanieService,
    private productService: ProductService,
    private quoteService: QuoteService,
    private projectService: ProjectService,
    private templateQuoteService: TemplateQuoteService,
    private rightService: RightService,
    private router: Router,
  ) {}

  ngOnChanges() {
    if(this.typeAutocomplete ==='project' && this.search.projectId)
        this.projectService.getProject(this.search.projectId)
        .subscribe( res => { if(this.arrayContent.length) this.arrayContent.splice(0, 1);
          this.arrayContent.push(res) }, error => { console.log(error); });
    if(this.typeAutocomplete ==='user' && this.search.userId)
        this.userService.getUser(this.search.userId)
        .subscribe( res => { if(this.arrayContent.length) this.arrayContent.splice(0, 1);
          this.arrayContent.push(res) }, error => { console.log(error); });
    if(this.typeAutocomplete ==='quote' && this.search.quoteId)
        this.quoteService.getQuote(this.search.quoteId)
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

    if(this.typeAutocomplete ==='product')
      this.productService.getProducts(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });

    if(this.typeAutocomplete ==='quote')
      this.quoteService.getQuotes(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });

    if(this.typeAutocomplete ==='project')
      this.projectService.getProjects(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });


    if(this.typeAutocomplete ==='templateQuote')
      this.templateQuoteService.getTemplateQuotes(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });

    if(this.typeAutocomplete ==='right')
      this.rightService.getRights(page, search)
      .subscribe( res => { this.fetchedData = res.data }, error => { console.log(error); });

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
      this.arrayContent.push(result)
  }

  selectData(data) {

    // if(this.typeAutocomplete ==='user')
    //   this.search.userId = data._id
    //
    // if(this.typeAutocomplete ==='project')
    //   this.search.projectId = data._id


    this.autocompleteSearch = ''
    this.fetchedData = []
    this.arrayContent.push(data)
    this.getResultAutocomplete.emit(this.arrayContent)
  }
  searchData() {
    if (!this.autocompleteSearch) {
      this.fetchedData = []
    } else {
      let cloneSearch = Object.assign({}, this.search);
      cloneSearch.search = this.autocompleteSearch,

      this.getData(1, cloneSearch)
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
