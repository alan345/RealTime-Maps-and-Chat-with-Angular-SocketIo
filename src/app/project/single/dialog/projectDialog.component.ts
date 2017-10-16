import { Component , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ProjectSingleComponent }  from '../projectSingle.component';
import { Search } from '../../../shared/shared.model';




@Component({
  selector: 'edit-options-dialog',
  templateUrl: './projectDialog.component.html',
})

export class ProjectDialogComponent {
  // @ViewChild(ProjectSingleComponent)
  // private projectSingleComponent: ProjectSingleComponent;
  search: Search = new Search();

  constructor(
    public dialogRef: MatDialogRef<ProjectSingleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.search = data.search
  }

  saved(data) {
    this.dialogRef.close(data)
  }

}
