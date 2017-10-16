import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {Quote} from './quote.model';
import {ToastsManager} from 'ng2-toastr';
import { AuthService } from '../auth/auth.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class QuoteService {


  private url: string = '/';
//  private token: string = localStorage.getItem('id_token');
//  private userId: string = localStorage.getItem('userId');
  private quotesForCurrentUser: Quote[] = [];
  private singleQuote = Object;

  constructor(
    private http: Http,
    private errorService: ErrorService,
    private toastr: ToastsManager,
    private authService: AuthService) {}

  getQuotes(page: number, search: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token)
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'quote/page/' + page , options)
      .timeout(5000)
      .map((response: Response) => {
        const quotes = response.json();
        return quotes;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


    getQuotesGraph(year: number, search: any) {
      let headers = new Headers({'Content-Type': 'application/json'});
      headers.append('Authorization', '' + this.authService.currentUser.token)
      let options = new RequestOptions({ headers: headers, search: search});
      return this.http.get(this.url + 'quote/graph/' + year , options)
        .timeout(5000)
        .map((response: Response) => {
          const paiementQuotes = response.json();
          return paiementQuotes;
        })
        .catch((error: Response) => {
          this.errorService.handleError(error.json());
          return Observable.throw(error.json());
        });
    }


  // getQuoteForCurrentUser() {
  //   // if(this.quotesForCurrentUser.length) {
  //   //   return Observable.of(this.quotesForCurrentUser)
  //   // } else {
  //   //   let id = this.authService.currentUser.userId
  //   //   let headers = new Headers({'Content-Type': 'application/json'});
  //   //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   //   return this.http.get(this.url + 'quote/byuserid/' + id, {headers: headers})
  //   //     .map((response: Response) => {
  //   //       this.quotesForCurrentUser = response.json().item
  //   //       return this.quotesForCurrentUser
  //   //     })
  //   //     .catch((error: Response) => {
  //   //       this.errorService.handleError(error.json());
  //   //       return Observable.throw(error.json());
  //   //     });
  //   // }
  //   let id = this.authService.currentUser.userId
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   return this.http.get(this.url + 'quote/byuserid/' + id, {headers: headers})
  //     .map((response: Response) => {
  //       return response.json().item
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }

  // getQuoteByUserId(id: string) {
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   return this.http.get(this.url + 'quote/byuserid/' + id, {headers: headers})
  //     .map((response: Response) => {
  //       return response.json().item
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }


  getQuote(id: string) : Observable<Quote> {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' );
    let options = new RequestOptions({ headers: headers, search: {}});
    return this.http.get(this.url + 'quote/' + id, options)
      .map((response: Response) => {
        return response.json().item;
      //  this.singleForm = response.json();
        //return this.singleForm;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


    downloadPDF(id: string) {
      let headers = new Headers({'Content-Type': 'application/json'});
      headers.append('Authorization', '' + this.authService.currentUser.token);
      return this.http.get(this.url + 'quote/pdf/' + id, {headers: headers})
        .map((response: Response) => {
          //console.log(response.json().item)
          return response.json().item;
        //  this.singleForm = response.json();
          //return this.singleForm;
        })
        .catch((error: Response) => {
          this.errorService.handleError(error.json());
          return Observable.throw(error.json());
        });
    }

  deleteQuote(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.delete(this.url + 'quote/' + id, {headers: headers})
      .map((response: Response) => {
      //  console.log("delete",response)
        return response.json();
      //  this.singleForm = response.json();
        //return this.singleForm;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  saveQuote(quote: Quote) {
  //  console.log("this.authService.currentUser.token",this.authService.currentUser.token);
    delete quote._id;
    const body = JSON.stringify(quote);
    const headers = new Headers({'Content-Type': 'application/json'});
  //  let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'quote/',body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  saveAsInvoice(quote: Quote) {
    const body = JSON.stringify(quote);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'quote/saveAsInvoice/', body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updateQuote(quote: Quote) {
    const body = JSON.stringify(quote);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'quote/' + quote._id, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updateSignature(quote: Quote) {
    const body = JSON.stringify(quote);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'quote/' + quote._id + '/signature', body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

}
