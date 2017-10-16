import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {Right} from './right.model';
import {ToastsManager} from 'ng2-toastr';
import { AuthService } from '../auth/auth.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RightService {


  private url: string = '/';
//  private token: string = localStorage.getItem('id_token');
//  private userId: string = localStorage.getItem('userId');
  private rightsForCurrentUser: Right[] = [];
  private singleRight = Object;

  constructor(
    private http: Http,
    private errorService: ErrorService,
    private toastr: ToastsManager,
    private authService: AuthService) {}

  getRights(page: number, search: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token)
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'right/page/' + page , options)
      .timeout(5000)
      .map((response: Response) => {
        const rights = response.json();
        return rights;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  getRightForCurrentUser() {
    // if(this.rightsForCurrentUser.length) {
    //   return Observable.of(this.rightsForCurrentUser)
    // } else {
    //   let id = this.authService.currentUser.userId
    //   let headers = new Headers({'Content-Type': 'application/json'});
    //   headers.append('Authorization', '' + this.authService.currentUser.token);
    //   return this.http.get(this.url + 'right/byuserid/' + id, {headers: headers})
    //     .map((response: Response) => {
    //       this.rightsForCurrentUser = response.json().item
    //       return this.rightsForCurrentUser
    //     })
    //     .catch((error: Response) => {
    //       this.errorService.handleError(error.json());
    //       return Observable.throw(error.json());
    //     });
    // }
    let id = this.authService.currentUser.userId
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.get(this.url + 'right/byuserid/' + id, {headers: headers})
      .map((response: Response) => {
        return response.json().item
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getRightByUserId(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.get(this.url + 'right/byuserid/' + id, {headers: headers})
      .map((response: Response) => {
        return response.json().item
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  getRight(id: string, search: any) : Observable<Right> {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'right/' + id, options)
      .map((response: Response) => {
        return response.json().item;
      //  this.singleForm = response.json();
        //return this.singleForm;
      })
      .catch((error: Response) => {
        // this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  deleteRight(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.delete(this.url + 'right/' + id, {headers: headers})
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



  saveRight(right: Right) {
  //  console.log("this.authService.currentUser.token",this.authService.currentUser.token);
    delete right._id;
    const body = JSON.stringify(right);
    const headers = new Headers({'Content-Type': 'application/json'});
  //  let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'right/',body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updateRight(right: Right) {
    const body = JSON.stringify(right);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'right/' + right._id, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

}
