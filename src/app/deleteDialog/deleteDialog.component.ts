import { Component} from '@angular/core';

import {  MatDialogRef} from '@angular/material';


@Component({
  selector: 'pressDeleteDialog',
  templateUrl: './deleteDialog.component.html',
})
export class DeleteDialog {
  constructor(public dialogRefDelete: MatDialogRef<DeleteDialog>) {}

  // deletePress(){
  //   console.log("delete")
  // }
}
