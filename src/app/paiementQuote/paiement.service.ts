import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';


import {User} from '../user/user.model';
import {Companie} from '../companie/companie.model';


import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {PaiementQuote} from './paiementQuote.model';

import { AuthService } from '../auth/auth.service';

import {ToastsManager} from 'ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';






@Injectable()
export class PaiementService {

  private url: string = '/';
  //private token: string = localStorage.getItem('id_token');
  //private userId: string = localStorage.getItem('userId');
  private users: User[] = [];

  constructor(
    private http: Http,
    private errorService: ErrorService,
    private toastr: ToastsManager,
    private authService: AuthService
  ) {}



  getStripeCust(fetchedPaiementQuoteId) {

    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token)
    let options = new RequestOptions({ headers: headers, search: {}});

    return this.http.get(this.url + 'paiement/getStripeCust/' + fetchedPaiementQuoteId, options)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => {
        // this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  getStripeAccountDetails() {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.get(this.url + 'paiement/getStripeAccountDetails', {headers: headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  getStripeCard() {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.get(this.url + 'paiement/getStripeCard', {headers: headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  getStripeSubscription(){
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.get(this.url + 'paiement/getStripeSubscription', {headers: headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  deleteSub(subId){
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.delete(this.url + 'paiement/deleteSub/' + subId, {headers: headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  deleteCard(cardId, fetchedPaiementQuoteId){
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.delete(this.url + 'paiement/deleteCard/' + cardId + '/' + fetchedPaiementQuoteId, {headers: headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  deleteCustInStripe(fetchedPaiementQuoteId){
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.delete(this.url + 'paiement/deleteCustInStripe/' + fetchedPaiementQuoteId, {headers: headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  saveCustInStripe(paiementQuote) {
    // let companie
    const body = JSON.stringify(paiementQuote);
    const headers = new Headers({'Content-Type': 'application/json'});
  //  let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'paiement/saveCustInStripe', body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }



  payInStripe(fetchedPaiementQuoteId, dataPayInStripe){
    const body = JSON.stringify(dataPayInStripe);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'paiement/payInStripe/' + fetchedPaiementQuoteId, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  saveCardInStripe(card, fetchedPaiementQuoteId){
    const body = JSON.stringify(card);
    const headers = new Headers({'Content-Type': 'application/json'});
  //  let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'paiement/saveCardInStripe/' + fetchedPaiementQuoteId, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  saveSubscriptionInStripe(plan, fetchedPaiementQuoteId){
    const body = JSON.stringify(plan);
    const headers = new Headers({'Content-Type': 'application/json'});
  //  let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'paiement/saveSubscriptionInStripe/' + fetchedPaiementQuoteId, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }



}
