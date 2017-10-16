import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {Notification} from './notification.model';
import {ToastsManager} from 'ng2-toastr';
import { AuthService } from '../auth/auth.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NotificationService {


  private url: string = '/';
//  private token: string = localStorage.getItem('id_token');
//  private userId: string = localStorage.getItem('userId');
  private notificationsForCurrentUser: Notification[] = [];
  private singleNotification = Object;

  constructor(
    private http: Http,
    private errorService: ErrorService,
    private toastr: ToastsManager,
    private authService: AuthService) {}

  getNotifications(page: number, search: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token)
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'notification/page/' + page , options)
      .timeout(5000)
      .map((response: Response) => {
        const notifications = response.json();
        return notifications;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  getNotificationForCurrentUser() {
    // if(this.notificationsForCurrentUser.length) {
    //   return Observable.of(this.notificationsForCurrentUser)
    // } else {
    //   let id = this.authService.currentUser.userId
    //   let headers = new Headers({'Content-Type': 'application/json'});
    //   headers.append('Authorization', '' + this.authService.currentUser.token);
    //   return this.http.get(this.url + 'notification/byuserid/' + id, {headers: headers})
    //     .map((response: Response) => {
    //       this.notificationsForCurrentUser = response.json().item
    //       return this.notificationsForCurrentUser
    //     })
    //     .catch((error: Response) => {
    //       this.errorService.handleError(error.json());
    //       return Observable.throw(error.json());
    //     });
    // }
    let id = this.authService.currentUser.userId
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.get(this.url + 'notification/byuserid/' + id, {headers: headers})
      .map((response: Response) => {
        return response.json().item
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getNotificationByUserId(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.get(this.url + 'notification/byuserid/' + id, {headers: headers})
      .map((response: Response) => {
        return response.json().item
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  getNotification(id: string, search: any) : Observable<Notification> {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'notification/' + id, options)
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
  deleteNotification(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.delete(this.url + 'notification/' + id, {headers: headers})
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



  saveNotification(notification: Notification) {
  //  console.log("this.authService.currentUser.token",this.authService.currentUser.token);
    delete notification._id;
    const body = JSON.stringify(notification);
    const headers = new Headers({'Content-Type': 'application/json'});
  //  let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'notification/',body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updateNotification(notification: Notification) {
    const body = JSON.stringify(notification);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'notification/' + notification._id, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

}
