import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { AdminGuardService} from '../admin/services/adminGuard';

import { ReportingsComponent} from './reportings.component';

import { CompanieGuardService} from '../companie/companieGuard.service';
import { PaiementGuardService} from '../user/paiement/paiementGuard.service';
import { AuthGuardService} from '../auth/authguard.service';



export const routes: Routes = [
  {path: '', component: ReportingsComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  // {path: 'new', component: EditReportingComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  // {path: 'new/:idQuote', component: EditReportingComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  // // {path: 'new/:idClient/:idProject', component: EditReportingComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  // {path: 'edit/:idReporting', component: EditReportingComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  // // {path: ':id', component: ReportingDetailComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  // {path: 'public/:idReporting', component: EditReportingComponent},

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRouting {}
