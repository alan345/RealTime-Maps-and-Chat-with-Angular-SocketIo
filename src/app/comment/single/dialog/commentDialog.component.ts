import { Component, ViewChild , Inject} from '@angular/core';
import { MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { CommentComponent }  from '../comment.component';
import { Quote } from '../../../quote/quote.model'
import { Comment } from '../../comment.model';


@Component({
  selector: 'edit-options-dialog',
  templateUrl: './commentDialog.component.html',
})

export class CommentDialogComponent {
  // fetchedQuote: Quote
  fetchedComment: Comment = new Comment()
  //
  // @ViewChild(EditCommentComponent)
  // private editCommentComponent: EditCommentComponent;

  constructor(
    public dialogRef: MatDialogRef<CommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data)
     this.fetchedComment = data.fetchedComment
    //  this.fetchedComment.title = data.fetchedComment.title
    //  this.fetchedComment.start = data.fetchedComment.start
    //  this.fetchedComment.end = data.fetchedComment.end
    //  this.fetchedComment.users = data.fetchedComment.users
    //  this.fetchedComment.projects = data.fetchedComment.projects
    //  this.fetchedComment.color = data.fetchedComment.color
    //  this.fetchedComment.details = data.fetchedComment.details
  }


  newCommentSaved() {
    this.dialogRef.close()
    // this.userFormsComponent.onUploadFinisedParentToChild();
  }
}
