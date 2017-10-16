import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// import { CompanieDetailComponent} from './single/companieDetail.component';
import { EditCompanieComponent} from './single/editCompanie.component';
// import { EditAddUserToCompanieComponent} from './addUser/editAddUserToCompanie.component';
import { AdminGuardService} from '../admin/services/adminGuard';
// import { CompanieDetailUsersComponent} from './companieDetailUsers.component';
import { CompaniesComponent} from './companies/companies.component';
// import { AddUserByCompanieComponent} from './addUser/addUserByCompanie.component';



export const routes: Routes = [
  {path: '', component: CompaniesComponent},
  // {path: 'edit/addUser/:id', component: EditAddUserToCompanieComponent},
  // {path: 'edit/addUser/:id/:email', component: EditAddUserToCompanieComponent},
  // {path: 'addUserByCompanie', component: AddUserByCompanieComponent},
  //{path: 'mine', component: EditCompanieComponent},
  {path: 'new', component: EditCompanieComponent},
  // {path: 'edit/:id', component: EditCompanieComponent},
  {path: ':id', component: EditCompanieComponent},
  // {path: ':id/users', component: CompanieDetailUsersComponent},
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanieRouting {}
