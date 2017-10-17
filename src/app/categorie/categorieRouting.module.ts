import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
import { CategoriesComponent} from './categories/categories.component';
import { CategorieSingleComponent} from './single/categorieSingle.component';
import { AdminCategoriesComponent} from './categories/adminCategories.component';

export const routes: Routes = [
  {path: '', component: AdminCategoriesComponent},
  {path: 'categorieSingle', component: CategorieSingleComponent},
  {path: 'categorieSingle/:id', component: CategorieSingleComponent},
  {path: ':id', component: CategorieSingleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorieRouting {}
