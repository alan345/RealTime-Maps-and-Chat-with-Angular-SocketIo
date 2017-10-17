import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


// import { CategorieDialogComponent } from './single/dialog/categorieDialog.component';

import { CategoriesComponent} from './categories/categories.component';
import { AdminCategoriesComponent} from './categories/adminCategories.component';
import { CategorieSingleComponent} from './single/categorieSingle.component';
import { CategorieService} from './categorie.service';
import { CompanieModule } from '../companie/companie.module';
import { CategorieRouting} from './categorieRouting.module';



import {SharedModule } from '../shared/shared.module';


@NgModule({
  imports:      [
    CategorieRouting,
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
    CompanieModule,
    SharedModule,
  ],
  declarations: [

    CategoriesComponent,
    AdminCategoriesComponent,
    CategorieSingleComponent,
    // CategorieDialogComponent,

  ],
  exports:      [
    CategoriesComponent,
   ],
  providers:    [
    CategorieService,
  ],
  entryComponents: [
    // CategorieDialogComponent,
  ]
})
export class CategorieModule { }
