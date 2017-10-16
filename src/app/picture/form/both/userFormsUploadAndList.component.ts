import {Component, ViewChild } from '@angular/core';
import { UserFormsComponent }  from '../list/userForms.component';


@Component({
  selector: 'user-FormsUploadAndList',
  templateUrl: './userFormsUploadAndList.component.html',
})

export class UserFormsUploadAndList {
  @ViewChild(UserFormsComponent)
  private userFormsComponent: UserFormsComponent;

  constructor() {}


  onUploadFinisedChildToParent(){
    // Parent to child
    //https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#parent-to-view-child
    this.userFormsComponent.onUploadFinisedParentToChild()
  }
}
