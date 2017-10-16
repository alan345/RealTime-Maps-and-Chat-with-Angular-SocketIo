import { Component, ViewChild , Inject} from '@angular/core';
import { MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { UserCalendarComponent }  from '../userCalendar.component';
import { Quote } from '../../../quote/quote.model'
import { UserCalendar } from '../../userCalendar.model';


@Component({
  selector: 'edit-options-dialog',
  templateUrl: './userCalendarDialog.component.html',
})

export class UserCalendarDialogComponent {
  // fetchedQuote: Quote
  fetchedUserCalendar: UserCalendar = new UserCalendar()
  //
  // @ViewChild(EditUserCalendarComponent)
  // private editUserCalendarComponent: EditUserCalendarComponent;

  constructor(
    public dialogRef: MatDialogRef<UserCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
     this.fetchedUserCalendar._id = data.fetchedUserCalendar._id
     this.fetchedUserCalendar.title = data.fetchedUserCalendar.title
     this.fetchedUserCalendar.start = data.fetchedUserCalendar.start
     this.fetchedUserCalendar.end = data.fetchedUserCalendar.end
     this.fetchedUserCalendar.clients = data.fetchedUserCalendar.clients
     this.fetchedUserCalendar.projects = data.fetchedUserCalendar.projects
     this.fetchedUserCalendar.color = data.fetchedUserCalendar.color
     this.fetchedUserCalendar.details = data.fetchedUserCalendar.details
     this.fetchedUserCalendar.assignedTos = data.fetchedUserCalendar.assignedTos
  }

  saved() {
    this.dialogRef.close()
  }
  // newUserCalendarSaved() {
  //   this.dialogRef.close()
  //   // this.userFormsComponent.onUploadFinisedParentToChild();
  // }
}
