import { Component, OnInit, Input } from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { CommentService} from '../comment.service';
import { Comment} from '../comment.model';
import { ToastsManager} from 'ng2-toastr';
import { MatDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation} from '@angular/core';
import { UserService} from '../../user/user.service';
import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['../comment.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class CommentsComponent implements OnInit {
  @Input() userId: string = '';
  @Input() showHeader = true;
  fetchedComments: Comment[] = [];
  @Input() search: any = {
    search: '',
    companieId: '',
    projectId: '',
  };
  loading: boolean;

  paginationData = {
    currentPage: 1,
    itemsPerPage: 0,
    totalItems: 0
  };


  categories2 = '';



  constructor(
    private sanitizer: DomSanitizer,
    private commentService: CommentService,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private userService: UserService,

  ) {
  }


  // goBack() {
  //   this.location.back();
  // }
  saved() {
    this.getComments(1, this.search)
  }
  // searchComments() {
  //   this.getComments(1, this.search)
  // }

  openDialogDelete(id: string){
    let this2 = this
    let dialogRefDelete = this.dialog.open(DeleteDialog)
    dialogRefDelete.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(id)
      }
    })
  }

  onDelete(id: string) {
    this.commentService.deleteComment(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          this.getComments(this.paginationData.currentPage, this.search)
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  getPage(page: number) {
    this.getComments(page, this.search);
  }


  loadMore(){
    this.paginationData.currentPage = this.paginationData.currentPage+1
    this.getComments(this.paginationData.currentPage, this.search)
  }


  getComments(page: number, search: any) {
    this.loading = true;
    this.commentService.getComments(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedComments = res.data

          this.loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    let this2 = this
    setTimeout(function(){
      this2.search.userId = this2.userId
      this2.search.orderBy = 'name'
      this2.getComments(1, this2.search)
    }, 200);
  }

  // isAdmin() {
  //   return this.authService.isAdmin();
  // }
}
