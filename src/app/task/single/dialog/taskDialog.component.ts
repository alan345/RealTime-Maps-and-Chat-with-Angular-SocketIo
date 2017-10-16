import { Component, ViewChild , Inject} from '@angular/core';
import { MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { TaskComponent }  from '../task.component';
import { Quote } from '../../../quote/quote.model'
import { Task } from '../../task.model';


@Component({
  selector: 'edit-options-dialog',
  templateUrl: './taskDialog.component.html',
})

export class TaskDialogComponent {
  // fetchedQuote: Quote
  fetchedTask: Task = new Task()
  //
  // @ViewChild(EditTaskComponent)
  // private editTaskComponent: EditTaskComponent;

  constructor(
    public dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data)
     this.fetchedTask = data.fetchedTask
    //  this.fetchedTask.title = data.fetchedTask.title
    //  this.fetchedTask.start = data.fetchedTask.start
    //  this.fetchedTask.end = data.fetchedTask.end
    //  this.fetchedTask.users = data.fetchedTask.users
    //  this.fetchedTask.projects = data.fetchedTask.projects
    //  this.fetchedTask.color = data.fetchedTask.color
    //  this.fetchedTask.details = data.fetchedTask.details
  }


  newTaskSaved() {
    this.dialogRef.close()
    // this.userFormsComponent.onUploadFinisedParentToChild();
  }
}
