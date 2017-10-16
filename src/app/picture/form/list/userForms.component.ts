import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormService} from '../form.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
// import { SeePictureDialogComponent } from '../seePictureDialog/seePictureDialog.component';
import { MatDialog} from '@angular/material';
import { Form } from '../form.model';


@Component({
  selector: 'app-user-form',
  templateUrl: './userForms.component.html',
  styleUrls: ['../form.component.css']
})
export class UserFormsComponent implements OnInit {
  @Input() itemsPerPage: number;
  @Input() isDialog: boolean;


  @Output() onPassForm = new EventEmitter<any>();
  fetchedForms: Form[] = [];

  loading: boolean;
  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };

  search = {
    id: '',
    itemsPerPage:5,
    seeAll:false
  }


  constructor(
    public dialog: MatDialog,
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit() {
      this.refresh()
  }
  refresh(){
    let this2 = this
    setTimeout(function(){
        this2.getUserForms(this2.paginationData.currentPage)
    }, 50);

  }

  getPage(page: number) {
    this.getUserForms(page);
  }

  getUserForms(page: number){
    this.loading = true;
    this.search['id'] = this.authService.currentUser.userId,
    this.search['itemsPerPage'] = this.itemsPerPage,


    this.formService.getUserForms(page, this.search)
      .subscribe(
        res => {
          this.loading = false;
          this.paginationData = res.paginationData;
          this.fetchedForms = res.data
        },
        error => console.log(error))
  }
  isFormPdf(form: Form){
    if(form.type === 'pdf')
      return true
    return false
  }
  onSelectRow(form: Form){

    if(this.isDialog) {
      this.onPassForm.emit(form);
    } else {
      if(this.isFormPdf(form)) {
        let url = './uploads/forms/' + form.owner + '/' + form.imagePath
        window.open(url);
      } else {
        // let dialogRef = this.dialog.open(SeePictureDialogComponent)
        // dialogRef.componentInstance.form = form;
        // dialogRef.afterClosed().subscribe(result => {
        // })
      }

    }

  }
  isAdmin() {
    return this.authService.isAdmin();
  }

  onDelete(formId: Form) {
    this.formService.deleteForm(formId)
      .subscribe(
        res => {
          this.getUserForms(this.paginationData.currentPage)
        },
        error => console.log(error))
  }
  onUploadFinisedParentToChild(){
    this.ngOnInit()
  }
}
