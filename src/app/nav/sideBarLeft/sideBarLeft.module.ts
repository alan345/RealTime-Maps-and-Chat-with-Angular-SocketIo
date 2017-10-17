import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Routes, RouterModule} from '@angular/router';



import { SideBarLeftComponent} from './sideBarLeft.component';
import { SharedObjModule } from '../../shared/sharedObj.module';
@NgModule({
  imports:      [
    // CategorieRouting,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedObjModule,
    //  FormsModule,
    
    // ReactiveFormsModule,

  ],
  declarations: [

    SideBarLeftComponent,
    // CategoriesComponent,
    // CategorieSingleComponent,
  ],
  exports:      [
    SideBarLeftComponent
    // CategoriesComponent
  ],
  providers:    [
    // CategorieService
  ],
  entryComponents: [ ]
})
export class SideBarLeftModule { }
