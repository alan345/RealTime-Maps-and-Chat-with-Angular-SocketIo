import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotificationComponent} from './single/notification.component';

// import { EditAddUserToNotificationComponent} from './addUser/editAddUserToNotification.component';
import { AdminGuardService} from '../admin/services/adminGuard';
// import { NotificationDetailUsersComponent} from './notificationDetailUsers.component';
import { NotificationsComponent} from './notifications/notifications.component';
// import { AddUserByNotificationComponent} from './addUser/addUserByNotification.component';



export const routes: Routes = [
  {path: '', component: NotificationsComponent},
  // {path: 'edit/addUser/:id', component: EditAddUserToNotificationComponent},
  // {path: 'edit/addUser/:id/:email', component: EditAddUserToNotificationComponent},
  // {path: 'addUserByNotification', component: AddUserByNotificationComponent},
  //{path: 'mine', component: EditNotificationComponent},
  {path: 'new', component: NotificationComponent},
  {path: ':id', component: NotificationComponent},
  // {path: ':id/users', component: NotificationDetailUsersComponent},
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRouting {}
