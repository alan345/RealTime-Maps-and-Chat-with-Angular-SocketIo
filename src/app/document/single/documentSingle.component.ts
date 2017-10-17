import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { DocumentService} from '../document.service';
import { ToastsManager} from 'ng2-toastr';
// import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Document, StatusDocument} from '../document.model';
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
  selector: 'app-document',
  templateUrl: './documentSingle.component.html',
  styleUrls: ['../document.component.css'],

})

export class DocumentSingleComponent implements OnInit {

  @Input() showBackButton: Boolean = true;
  @Output() saved: EventEmitter<any> = new EventEmitter();

  @Input() search: Search = new Search()


  // status = StatusDocument
  // categ: string = 'Electricité';
  // subCateg: string = 'file';
  // autocompleteUser: string = '';
  // autocompleteQuote: string = '';
  // fetchedUsers: User[] = [];
  // fetchedQuotes: Quote[] = [];


  fetchedDocument: Document = new Document();


  public myForm: FormGroup;

  constructor(
    // private sanitizer: DomSanitizer,
    private documentService: DocumentService,
    private toastr: ToastsManager,
    // public dialog: MatDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private userService: UserService,
    // private quoteService: QuoteService,
    private authService: AuthService,
    private globalEventsManager: GlobalEventsManager,
  ) {
  }



  ngOnChanges() {
    if (this.search.documentId) {
      this.getDocument(this.search.documentId)
    }
    // this.search = new Search()
  }

  ngOnInit() {
    this.myForm = this._fb.group({
      status: [''],
      link: [''],
      start: [''],
      end: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
    });

    //
    // this.fetchedDocument.dateDocument.startString = this.authService.isoDateToHtmlDate(this.fetchedDocument.dateDocument.start)
    // this.fetchedDocument.dateDocument.endString = this.authService.isoDateToHtmlDate(this.fetchedDocument.dateDocument.end)



    this.activatedRoute.params.subscribe((params: Params) => {
      // console.log(this.search)

      // if (this.search.documentId) {
      //   this.getDocument(this.search.documentId)
      // } else if (params['id']) {
      //     this.getDocument(params['id'])
      // }

    })

  }


  save() {


    if(this.fetchedDocument._id) {
      this.documentService.updateDocument(this.fetchedDocument)
        .subscribe(
          res => {

            this.toastr.success('Great!', res.message)
            this.globalEventsManager.refreshCenter(true);
            this.closeRight()
            // this.fetchedDocument = res.obj
            // this.getDocument(res.obj._id)
            // this.saved.emit(res.obj)
            // this.router.navigate(['document/' + res.obj._id]);
          },
          error => {console.log(error)}
        );
    } else {
      this.documentService.saveDocument(this.fetchedDocument)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.globalEventsManager.refreshCenter(true);
            this.closeRight()
            // this.fetchedDocument = res.obj
            // this.getDocument(res.obj._id)
            // this.saved.emit(res.obj)
            // this.router.navigate(['document/' + res.obj._id]);
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

  // openDialogDelete(){
  //   let this2 = this
  //   let dialogRefDelete = this.dialog.open(DeleteDialog)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.onDelete(this.fetchedDocument._id).then(function(){
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
  //     this.fetchedDocument.categories.forEach((fetchedCategorie, indexFetched) => {
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
  //     this.fetchedDocument.categories.forEach((fetchedCategorie, indexFetched) => {
  //       if(HardCategorie.name == fetchedCategorie.name) {
  //         this.categoriesHard1[indexHard].selected = true
  //       }
  //     })
  //   })
  // }




  getDocument(id : string) {
    this.documentService.getDocument(id)
      .subscribe(
        res => {
          this.fetchedDocument = <Document>res

        },
        error => {
          console.log(error);
        }
      )
  }

  openDeleteConfirmation() {
      let newShowNavBarData = new ShowNavBarData()
      newShowNavBarData.search.typeScreen = 'deleteConfirmation'
      newShowNavBarData.search.typeObj = 'document'
      newShowNavBarData.search.documentId = this.fetchedDocument._id
      this.globalEventsManager.showNavBarRight(newShowNavBarData)
  }

}
