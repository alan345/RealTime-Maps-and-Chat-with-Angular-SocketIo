import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {LogService} from '../log.service';
// import {CategorieService} from '../../categorie/categorie.service';
// import { ProjectService} from '../../project/project.service';

import {Log} from '../log.model';

import {ToastsManager} from 'ng2-toastr';

import {MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
// import { UserService} from '../../user/user.service';
// import { QuoteService } from '../../quote/quote.service';
// import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';
// // import { Quote } from '../../quote/quote.model';
// import { Categorie } from '../../categorie/categorie.model';
// import { Project } from '../../project/project.model';





@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['../log.component.css'],
})
export class LogComponent implements OnInit {
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Input() showHeader = true;
  @Input() fetchedLog: Log = new Log()
  @Input() search: any = {
    search: '',
    companieId: '',
    projectId: '',
  };
  statusTypes = [
    { label: 'Not Started', value: '' },
    { label: 'Pending', value: 'pending' },
    { label: 'Done', value: 'done' }
  ]

  showPaiements: boolean = false


  myForm: FormGroup;
  autocompleteCategorie: String = ''
  fetchedUsers: User[] = [];
  arrayContentToSearch =[]

  paiementsTypes = [
    { label: 'cheque', value: 'check' },
    { label: 'Espece', value: 'cash' }
]
  constructor(
    private logService: LogService,
    // private quoteService: QuoteService,
    // private projectService: ProjectService,
    // private userService: UserService,
    // private categorieService: CategorieService,
//    private modalService: NgbModal,
    private toastr: ToastsManager,
    // public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    // this.myForm = this._fb.group({
    //   logName: ['', [Validators.required, Validators.minLength(1)]],
    // })

    this.activatedRoute.params.subscribe((params: Params) => {
      // console.log(params)
      if(params['idLog'])
        this.getLog(params['idLog'])

    //  if(params['idProject'])
    //   this.getProject(params['idProject'])
    })
  }

  getPicture(picture) {
    console.log(picture)
    // this.fetchedLog.forms.push(picture)
  }





  save() {
    // if(!this.fetchedLog.logName)
    //   return
    // this.fetchedLog.quotes = this.search.quoteId
    // this.fetchedLog.datePaiement = this.authService.HTMLDatetoIsoDate(this.fetchedLog.datePaiementString)
    // if(this.fetchedLog._id) {
    //   this.logService.updateLog(this.fetchedLog)
    //     .subscribe(
    //       res => {
    //         this.toastr.success('Great!', res.message)
    //         // this.fetchedLog = res.obj
    //         //this.router.navigate(['log/edit/' + this.fetchedLog._id])
    //       },
    //       error => {
    //         this.toastr.error('error!', error)
    //       }
    //     )
    // } else {
      this.logService.saveLog(this.fetchedLog)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.saved.emit(res.obj)
            this.fetchedLog = new Log()
            // this.fetchedLog = res.obj
            // this.newLogSaved.emit()
            // if(this.showHeader)
            //   this.router.navigate(['log/edit/' + res.obj._id])
          },
          error => {console.log(error)}
        )
    // }

  }







  goBack() {
    this.location.back();
  }





  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.logService.deleteLog(id)
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


  // openDialogDelete(){
  //   let this2 = this
  //   let dialogRefDelete = this.dialog.open(DeleteDialog)
  //   dialogRefDelete.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.onDelete(this.fetchedLog._id).then(function(){
  //         this2.router.navigate(['log']);
  //       })
  //
  //     }
  //   })
  // }




  getLog(id: string) {
    this.logService.getLog(id)
      .subscribe(
        res => {
          this.fetchedLog = res

        },
        error => {
          console.log(error);
        }
      )
  }




}
