import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HomeService {

  private url: string = '/';
  private token: string = localStorage.getItem('id_token');
  //private userId: string = localStorage.getItem('userId');

  constructor(private http: Http, private errorService: ErrorService, private toastr: ToastsManager) {}


  // get user forms from backend in order to display them in the front end
  // getOptions() {
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.token);
  //   return this.http.get(this.url + 'options/' , {headers: headers})
  //     .timeout(8000)
  //     .map((response: Response) => {
  //       const obj = response.json();
  //       return obj;
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }
  //
  // updateOptions(options: any){
  //   const body = JSON.stringify(options);
  //   const headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.token);
  //   return this.http.put(this.url + 'options/' + 'updateoption', body, {headers: headers})
  //     .map(response => response.json())
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }





}
