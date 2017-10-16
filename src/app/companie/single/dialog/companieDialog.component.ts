import { Component, ViewChild } from '@angular/core';
import { MatDialogRef} from '@angular/material';
// import { EditCompanieComponent }  from '../editCompanie.component';



@Component({
  selector: 'edit-options-dialog',
  templateUrl: './companieDialog.component.html',
})

export class CompanieDialogComponent {
  // @ViewChild(EditCompanieComponent)
  // private editCompanieComponent: EditCompanieComponent;

  constructor(public dialogRef: MatDialogRef<CompanieDialogComponent>) {}

  saved(data) {
    this.dialogRef.close(data)
  }
}
