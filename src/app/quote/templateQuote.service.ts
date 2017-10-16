import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {TemplateQuote} from './templateQuote.model';
import {ToastsManager} from 'ng2-toastr';
import { AuthService } from '../auth/auth.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TemplateQuoteService {


  private url: string = '/';


  constructor(
    private http: Http,
    private errorService: ErrorService,
    private toastr: ToastsManager,
    private authService: AuthService) {}

  getTemplateQuotes(page: number, search: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token)
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'templateQuote/page/' + page , options)
      .timeout(5000)
      .map((response: Response) => {
        const templateQuotes = response.json();
        return templateQuotes;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


    getTemplateQuotesGraph(year: number, search: any) {
      let headers = new Headers({'Content-Type': 'application/json'});
      headers.append('Authorization', '' + this.authService.currentUser.token)
      let options = new RequestOptions({ headers: headers, search: search});
      return this.http.get(this.url + 'templateQuote/graph/' + year , options)
        .timeout(5000)
        .map((response: Response) => {
          const paiementTemplateQuotes = response.json();
          return paiementTemplateQuotes;
        })
        .catch((error: Response) => {
          this.errorService.handleError(error.json());
          return Observable.throw(error.json());
        });
    }


  // getTemplateQuoteForCurrentUser() {
  //   // if(this.templateQuotesForCurrentUser.length) {
  //   //   return Observable.of(this.templateQuotesForCurrentUser)
  //   // } else {
  //   //   let id = this.authService.currentUser.userId
  //   //   let headers = new Headers({'Content-Type': 'application/json'});
  //   //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   //   return this.http.get(this.url + 'templateQuote/byuserid/' + id, {headers: headers})
  //   //     .map((response: Response) => {
  //   //       this.templateQuotesForCurrentUser = response.json().item
  //   //       return this.templateQuotesForCurrentUser
  //   //     })
  //   //     .catch((error: Response) => {
  //   //       this.errorService.handleError(error.json());
  //   //       return Observable.throw(error.json());
  //   //     });
  //   // }
  //   let id = this.authService.currentUser.userId
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   return this.http.get(this.url + 'templateQuote/byuserid/' + id, {headers: headers})
  //     .map((response: Response) => {
  //       return response.json().item
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }

  // getTemplateQuoteByUserId(id: string) {
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   return this.http.get(this.url + 'templateQuote/byuserid/' + id, {headers: headers})
  //     .map((response: Response) => {
  //       return response.json().item
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }


  getTemplateQuote(id: string, search: any) : Observable<TemplateQuote> {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' );
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'templateQuote/' + id, options)
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
  deleteTemplateQuote(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.delete(this.url + 'templateQuote/' + id, {headers: headers})
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

  saveTemplateQuote(templateQuote: TemplateQuote) {
  //  console.log("this.authService.currentUser.token",this.authService.currentUser.token);
    delete templateQuote._id;
    const body = JSON.stringify(templateQuote);
    const headers = new Headers({'Content-Type': 'application/json'});
  //  let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'templateQuote/',body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updateTemplateQuote(templateQuote: TemplateQuote) {
    const body = JSON.stringify(templateQuote);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'templateQuote/' + templateQuote._id, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

}
