import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Routes, RouterModule} from '@angular/router';



import { SideBarRightComponent} from './sideBarRight.component';
import { SharedObjModule } from '../../shared/sharedObj.module';
// // import { NotificationService} from '../../notification/notification.service';
// import {UserModule} from '../../user/user.module';
// import {NewUserComponent} from '../../user/singleUser/newUser.component';
// import {QuoteModule} from '../../quote/quote.module'
// import {SharedSmallModule } from '../../shared/sharedSmall.module';
import {NewObjModule} from '../newObj/newObj.module';
// import {NotifModule} from '../notif/notif.module';
import {DeleteConfirmationModule} from '../deleteConfirmation/deleteConfirmation.module';



@NgModule({
  imports:      [
    // UserModule,
    // CategorieRouting,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DeleteConfirmationModule,
    // NewUserComponent,
    // QuoteModule,
    // SharedSmallModule
    SharedObjModule,

    NewObjModule,
    // NotifModule,
    // ReactiveFormsModule,

  ],
  declarations: [

    SideBarRightComponent,
    // NewUserComponent,
    // CategoriesComponent,
    // CategorieSingleComponent,
  ],
  exports:      [
    SideBarRightComponent
    // CategoriesComponent
  ],
  providers:    [
    // NotificationService,
    // CategorieService
  ],
  entryComponents: [ ]
})
export class SideBarRightModule { }
