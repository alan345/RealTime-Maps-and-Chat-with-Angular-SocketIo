import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
//import {USER_ROUTES} from './user/user.routes';

import {ADMIN_ROUTES} from './admin/admin.routes';
// import {FormComponent} from './form/form.component';
// import {UserFormsComponent} from './form/userForms.component';
// import { UserFormsUploadAndList} from './form/userFormsUploadAndList.component';


import { CompanieGuardService} from './companie/companieGuard.service';
import { PaiementGuardService} from './user/paiement/paiementGuard.service';
import { AuthGuardService} from './auth/authguard.service';

import { MainPageHomeComponent} from './mainPageHome/mainPageHome.component';

import {AdminComponent} from './admin/admin.component';
import {ErrorPageComponent} from './errorPage/errorPage.component';
import {AdminGuardService} from './admin/services/adminGuard';

import { NgModule } from '@angular/core';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: MainPageHomeComponent, canActivate: [AuthGuardService], pathMatch: 'full'},
  {path: 'comment', loadChildren: 'app/comment/comment.module#CommentModule', canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  // {path: 'userCalendar', loadChildren: 'app/userCalendar/userCalendar.module#UserCalendarModule', canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'companie', loadChildren: 'app/companie/companie.module#CompanieModule', canActivate: [AuthGuardService]},
  {path: 'right', loadChildren: 'app/right/right.module#RightModule', canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'quote', loadChildren: 'app/quote/quote.module#QuoteModule'},
  {path: 'paiementQuote', loadChildren: 'app/paiementQuote/paiementQuote.module#PaiementQuoteModule', canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'userCalendar', loadChildren: 'app/userCalendar/userCalendar.module#UserCalendarModule', canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'reporting', loadChildren: 'app/reporting/reporting.module#ReportingModule', canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'product', loadChildren: 'app/product/product.module#ProductModule', canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'chat', loadChildren: 'app/chat/chat.module#ChatModule', canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'project', loadChildren: 'app/project/project.module#ProjectModule', canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'task', loadChildren: 'app/task/task.module#TaskModule', canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'notification', loadChildren: 'app/notification/notification.module#NotificationModule', canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'user', loadChildren: 'app/user/user.module#UserModule'},


  // {path: 'form', component: FormComponent, canActivate: [AuthGuardService]},
  // {path: 'userForms', component: UserFormsUploadAndList, canActivate: [AuthGuardService]},

  {path: 'admin', component: AdminComponent, children: ADMIN_ROUTES},
  {path: '404', component: ErrorPageComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
