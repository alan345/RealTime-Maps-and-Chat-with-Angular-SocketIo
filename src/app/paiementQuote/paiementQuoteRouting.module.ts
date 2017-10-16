import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EditPaiementQuoteComponent} from './single/editPaiementQuote.component';

import { AdminGuardService} from '../admin/services/adminGuard';

import { PaiementQuotesComponent} from './paiementQuotes/paiementQuotes.component';

import { CompanieGuardService} from '../companie/companieGuard.service';
import { PaiementGuardService} from '../user/paiement/paiementGuard.service';
import { AuthGuardService} from '../auth/authguard.service';



export const routes: Routes = [

  {path: 'new', component: EditPaiementQuoteComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'new/:isGooplusPaiement', component: EditPaiementQuoteComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  // {path: 'new/:idQuote', component: EditPaiementQuoteComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  // {path: 'new/:idClient/:idProject', component: EditPaiementQuoteComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'edit/:idPaiementQuote', component: EditPaiementQuoteComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  // {path: ':id', component: PaiementQuoteDetailComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: 'public/:idPaiementQuote', component: EditPaiementQuoteComponent},
  // {path: ':isExpense/:isGooplusPaiement', component: PaiementQuotesComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},
  {path: ':isExpense', component: PaiementQuotesComponent, canActivate: [AuthGuardService, CompanieGuardService, PaiementGuardService]},

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaiementQuoteRouting {}
