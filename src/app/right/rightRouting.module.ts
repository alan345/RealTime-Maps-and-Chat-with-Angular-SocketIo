import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RightComponent} from './single/right.component';

// import { EditAddUserToRightComponent} from './addUser/editAddUserToRight.component';
import { AdminGuardService} from '../admin/services/adminGuard';
// import { RightDetailUsersComponent} from './rightDetailUsers.component';
import { RightsComponent} from './rights/rights.component';
// import { AddUserByRightComponent} from './addUser/addUserByRight.component';



export const routes: Routes = [
  {path: '', component: RightsComponent},
  // {path: 'edit/addUser/:id', component: EditAddUserToRightComponent},
  // {path: 'edit/addUser/:id/:email', component: EditAddUserToRightComponent},
  // {path: 'addUserByRight', component: AddUserByRightComponent},
  //{path: 'mine', component: EditRightComponent},
  {path: 'new', component: RightComponent},
  {path: ':id', component: RightComponent},
  // {path: ':id/users', component: RightDetailUsersComponent},
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RightRouting {}
