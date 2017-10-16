import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserCalendarComponent} from './single/userCalendar.component';

import { AdminGuardService} from '../admin/services/adminGuard';

import { UserCalendarsComponent} from './list/userCalendars.component';

import { CompanieGuardService} from '../companie/companieGuard.service';
import { PaiementGuardService} from '../user/paiement/paiementGuard.service';
import { AuthGuardService} from '../auth/authguard.service';


export const routes: Routes = [
  {path: '', component: UserCalendarsComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'new', component: UserCalendarComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'new/:idQuote', component: UserCalendarComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  // {path: 'new/:idClient/:idProject', component: EditUserCalendarComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'edit/:idUserCalendar', component: UserCalendarComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  // {path: ':id', component: UserCalendarDetailComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  // {path: 'public/:idUserCalendar', component: UserCalendarComponent},

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCalendarRouting {}
