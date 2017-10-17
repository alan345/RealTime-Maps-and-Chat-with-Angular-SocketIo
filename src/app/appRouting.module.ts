import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {ADMIN_ROUTES} from './admin/admin.routes';
// import {FormComponent} from './form/form.component';
// import {UserFormsComponent} from './form/userForms.component';
// import { UserFormsUploadAndList} from './form/userFormsUploadAndList.component';


import { CompanieGuardService} from './companie/companieGuard.service';
// import { PaiementGuardService} from './user/paiement/paiementGuard.service';
import { AuthGuardService} from './auth/authguard.service';

import { HomeComponent} from './home/home.component';

import {AdminComponent} from './admin/admin.component';
import {ErrorPageComponent} from './errorPage/errorPage.component';
import {AdminGuardService} from './admin/services/adminGuard';

import { NgModule } from '@angular/core';



export const routes: Routes = [
  {path: '', loadChildren: 'app/home/home.module#HomeModule', canActivate: [AuthGuardService], pathMatch: 'full'},
  // {path: 'log', loadChildren: 'app/log/log.module#LogModule', canActivate: [AuthGuardService]},
  // {path: 'mission', loadChildren: 'app/mission/mission.module#MissionModule', canActivate: [AuthGuardService]},
  {path: 'document', loadChildren: 'app/document/document.module#DocumentModule', canActivate: [AuthGuardService]},
  // {path: 'strat', loadChildren: 'app/strat/strat.module#StratModule', canActivate: [AuthGuardService]},
  // {path: 'brief', loadChildren: 'app/brief/brief.module#BriefModule', canActivate: [AuthGuardService]},
  // {path: 'userCalendar', loadChildren: 'app/userCalendar/userCalendar.module#UserCalendarModule', canActivate: [AuthGuardService]},
  {path: 'companie', loadChildren: 'app/companie/companie.module#CompanieModule', canActivate: [AuthGuardService]},
  {path: 'right', loadChildren: 'app/right/right.module#RightModule', canActivate: [AuthGuardService]},
  // {path: 'quote', loadChildren: 'app/quote/quote.module#QuoteModule'},
  // {path: 'paiementQuote', loadChildren: 'app/paiementQuote/paiementQuote.module#PaiementQuoteModule', canActivate: [AuthGuardService]},
  // {path: 'userCalendar', loadChildren: 'app/userCalendar/userCalendar.module#UserCalendarModule', canActivate: [AuthGuardService]},
  // {path: 'reporting', loadChildren: 'app/reporting/reporting.module#ReportingModule', canActivate: [AuthGuardService]},
  // {path: 'categorie', loadChildren: 'app/categorie/categorie.module#CategorieModule', canActivate: [AuthGuardService]},
  {path: 'chat', loadChildren: 'app/chat/chat.module#ChatModule', canActivate: [AuthGuardService]},
  {path: 'project', loadChildren: 'app/project/project.module#ProjectModule', canActivate: [AuthGuardService]},
  // {path: 'task', loadChildren: 'app/task/task.module#TaskModule', canActivate: [AuthGuardService]},
  // {path: 'notification', loadChildren: 'app/notification/notification.module#NotificationModule', canActivate: [AuthGuardService]},
  {path: 'user', loadChildren: 'app/user/user.module#UserModule'},


  // {path: 'form', component: FormComponent, canActivate: [AuthGuardService]},
  // {path: 'userForms', component: UserFormsUploadAndList, canActivate: [AuthGuardService]},

  // {path: 'admin', component: AdminComponent, children: ADMIN_ROUTES},
  {path: '404', component: ErrorPageComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
