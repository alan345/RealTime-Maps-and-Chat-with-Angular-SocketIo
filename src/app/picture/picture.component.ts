import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatDialogRef} from '@angular/material';
// import { ProjectSingleComponent }  from '../projectSingle.component';
import { Form } from './form/form.model';
// import { EditOptionsComponentDialog } from './form/single/modalLibrary/modalLibrary.component';
// import { MatDialog } from '@angular/material';
import {GlobalEventsManager} from '../globalEventsManager';
import {ShowNavBarData} from '../home/home.model'



@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css'],
})

export class PictureComponent {
  @Input() forms: Form[] = [];
  @Input() addPicture: boolean = true
  @Input() userIdToOpenProfile: string = ''
  @Input() deletePicture: boolean = true
  // @Input() useDialog: boolean = true
  @Output() getPicture: EventEmitter<any> = new EventEmitter();


  constructor(
    private globalEventsManager: GlobalEventsManager,
    // public dialog: MatDialog,
  ) {}

  // openDialog(positionImage: string) {
  //   let dialogRef = this.dialog.open(EditOptionsComponentDialog);
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.forms.push(result)
  //       this.getPicture.emit(result)
  //     }
  //   })
  // }
  onPassForm(result) {
    this.forms.push(result)
    this.getPicture.emit(result)
  }
  removePic(i) {
    this.forms.splice(i, 1);
  }
  //might be deprecated
  openProfile() {
    if(this.userIdToOpenProfile) {
      let showNavBarData = new ShowNavBarData()
      showNavBarData.search.typeScreen = 'profile'
      showNavBarData.search.typeObj = 'user'
      showNavBarData.search.userId = this.userIdToOpenProfile
      this.globalEventsManager.showNavBarRight(showNavBarData);
    }
  }

}
