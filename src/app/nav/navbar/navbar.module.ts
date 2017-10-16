import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Routes, RouterModule} from '@angular/router';

// import { MaterialModule } from '@angular/material';

import { NavbarComponent} from './navbar.component';
// import { ListNewObjComponent} from './newObj/listNewObj.component';
import {SharedModule } from '../../shared/shared.module';
import { NotificationService} from '../../notification/notification.service';
import {NotificationModule} from '../../notification/notification.module';
import {ListNewObjDialogComponent} from './newObj/dialog/listNewObjDialog.component'


@NgModule({
  imports:      [
    // ProductRouting,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NotificationModule,
    //  FormsModule,
    // MaterialModule,
    // ReactiveFormsModule,

  ],
  declarations: [

    NavbarComponent,
    // ListNewObjComponent,
    ListNewObjDialogComponent,
    // ProductsComponent,
    // ProductSingleComponent,
  ],
  exports:      [
    NavbarComponent,
    // ListNewObjComponent,
    // ProductsComponent
  ],
  providers:    [
    NotificationService,
    // ProductService
  ],
  entryComponents: [
  ListNewObjDialogComponent
  ]
})
export class NavbarModule { }
