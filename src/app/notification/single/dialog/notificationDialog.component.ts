import { Component, ViewChild } from '@angular/core';
import { MatDialogRef} from '@angular/material';
import { NotificationComponent }  from '../notification.component';



@Component({
  selector: 'edit-options-dialog',
  templateUrl: './notificationDialog.component.html',
})

export class NotificationDialogComponent {
  // @ViewChild(NotificationSingleComponent)
  // private notificationSingleComponent: NotificationSingleComponent;

  constructor(public dialogRef: MatDialogRef<NotificationComponent>) {}

  saved(data) {
    this.dialogRef.close(data)
  }

}
