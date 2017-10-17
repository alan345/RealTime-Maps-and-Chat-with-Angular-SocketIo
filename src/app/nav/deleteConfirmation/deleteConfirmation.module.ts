import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Routes, RouterModule} from '@angular/router';



import { DeleteConfirmationComponent} from './deleteConfirmation.component';
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

    DeleteConfirmationComponent,
    // CategoriesComponent,
    // CategorieSingleComponent,
  ],
  exports:      [
    DeleteConfirmationComponent
    // CategoriesComponent
  ],
  providers:    [
    // NotificationService,
    // CategorieService
  ],
  entryComponents: [ ]
})
export class DeleteConfirmationModule { }
