import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// import { CompanieDetailComponent} from './single/companieDetail.component';
import { HomeComponent} from './home.component';
// import { EditAddUserToCompanieComponent} from './addUser/editAddUserToCompanie.component';
import { AdminGuardService} from '../admin/services/adminGuard';
// import { CompanieDetailUsersComponent} from './companieDetailUsers.component';



export const routes: Routes = [
  {path: '', component: HomeComponent},
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRouting {}
