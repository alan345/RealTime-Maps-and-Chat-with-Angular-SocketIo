import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialogRef} from '@angular/material';
// import { ListNewObjComponent }  from '../listNewObj.component';
import { AuthService} from '../../../../auth/auth.service';
import {
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes
 } from '@angular/core';

@Component({
  selector: 'edit-options-dialog',
  templateUrl: './listNewObjDialog.component.html',
  styleUrls: ['../../navbar.component.css'],
  animations: [
    trigger('toggleState', [
      state('true' , style({  })),
      state('false', style({ top: '55px', display: 'none' })),
      // transition
      transition('* => *', animate('100ms')),
    ])
  ],
})

export class ListNewObjDialogComponent implements AfterViewInit  {
  // @ViewChild(ProductSingleComponent)
  // private productSingleComponent: ProductSingleComponent;
  shouldToggle = false;
  constructor(
    private authService: AuthService,
  ) {

  }

  ngAfterViewInit() {

    // let this2 = this
    setTimeout(()=> this.shouldToggle = true, 410);
    // this.shouldToggle = !this.shouldToggle
  }

  toggleMove() {
      this.shouldToggle = !this.shouldToggle
  }

  saved(data) {
    // this.dialogRef.close(data)
  }

}
