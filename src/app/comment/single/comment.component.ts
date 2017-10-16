import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {CommentService} from '../comment.service';
// import {ProductService} from '../../product/product.service';
// import { ProjectService} from '../../project/project.service';

import {Comment} from '../comment.model';

import {ToastsManager} from 'ng2-toastr';

import {MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
// import { UserService} from '../../user/user.service';
import { QuoteService } from '../../quote/quote.service';
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';
// import { Quote } from '../../quote/quote.model';
// import { Product } from '../../product/product.model';
// import { Project } from '../../project/project.model';





@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['../comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Input() showHeader = true;
  @Input() fetchedComment: Comment = new Comment()
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
  autocompleteProduct: String = ''
  fetchedUsers: User[] = [];
  arrayContentToSearch =[]

  paiementsTypes = [
    { label: 'cheque', value: 'check' },
    { label: 'Espece', value: 'cash' }
]
  constructor(
    private commentService: CommentService,
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
    this.myForm = this._fb.group({
      commentName: ['', [Validators.required, Validators.minLength(1)]],
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      // console.log(params)
      if(params['idComment'])
        this.getComment(params['idComment'])

    //  if(params['idProject'])
    //   this.getProject(params['idProject'])
    })
  }

  getPicture(picture) {
    console.log(picture)
    // this.fetchedComment.forms.push(picture)
  }





  save() {
    if(!this.fetchedComment.commentName)
      return
    if(this.search.quoteId) this.fetchedComment.quotes = this.search.quoteId
    if(this.search.projectId) this.fetchedComment.projects = this.search.projectId
    // this.fetchedComment.datePaiement = this.authService.HTMLDatetoIsoDate(this.fetchedComment.datePaiementString)
    // if(this.fetchedComment._id) {
    //   this.commentService.updateComment(this.fetchedComment)
    //     .subscribe(
    //       res => {
    //         this.toastr.success('Great!', res.message)
    //         // this.fetchedComment = res.obj
    //         //this.router.navigate(['comment/edit/' + this.fetchedComment._id])
    //       },
    //       error => {
    //         this.toastr.error('error!', error)
    //       }
    //     )
    // } else {
      this.commentService.saveComment(this.fetchedComment)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.saved.emit(res.obj)
            this.fetchedComment = new Comment()
            // this.fetchedComment = res.obj
            // this.newCommentSaved.emit()
            // if(this.showHeader)
            //   this.router.navigate(['comment/edit/' + res.obj._id])
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
      this2.commentService.deleteComment(id)
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
        this.onDelete(this.fetchedComment._id).then(function(){
          this2.router.navigate(['comment']);
        })

      }
    })
  }




  getComment(id: string) {
    this.commentService.getComment(id)
      .subscribe(
        res => {
          this.fetchedComment = res

        },
        error => {
          console.log(error);
        }
      )
  }




}
