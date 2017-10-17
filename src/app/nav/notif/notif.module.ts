import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Routes, RouterModule} from '@angular/router';



import { NotifComponent} from './notif.component';
// import {SharedModule } from '../../shared/shared.module';
// import { NotificationService} from '../../notification/notification.service';


@NgModule({
  imports:      [
    // CategorieRouting,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // SharedModule,
    //  FormsModule,
    
    // ReactiveFormsModule,

  ],
  declarations: [

    NotifComponent,
    // CategoriesComponent,
    // CategorieSingleComponent,
  ],
  exports:      [
    NotifComponent
    // CategoriesComponent
  ],
  providers:    [
    // NotificationService,
    // CategorieService
  ],
  entryComponents: [ ]
})
export class NotifModule { }
