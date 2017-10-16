import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {User} from './user.model';
import {Companie} from '../companie/companie.model';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {newPassword} from './user.model';
import {AuthService} from '../auth/auth.service';




@Injectable()
export class UserService {

  private url: string = '/';
  //private token: string = localStorage.getItem('id_token');
  //private userId: string = localStorage.getItem('userId');
  private users: User[] = [];
  private currentUser: User = new User();

  constructor(
    private http: Http,
    private errorService: ErrorService,
    private toastr: ToastsManager,
    private authService: AuthService
  ) {}

  // get user forms from backend in order to display them in the front end
  getUsers(page: number, search: any) {
    let headers = new Headers({'Content-Type': 'application/json'})
    headers.append('Authorization', '' + this.authService.currentUser.token)
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'profile/page/' + page , options)
      .timeout(9000)
      .map((response: Response) => {
        const users = response.json();
        return users;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      })
  }
  getCityByZip(zip: string) {
    return this.http.get('http://api.zippopotam.us/fr/' + zip )
      .timeout(9000)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      })
  }


  // cleanCurrentUserInSession(){
  //   this.currentUser = new User();
  // }

  // getCurrentUserInSession(){
  //   return this.currentUser
  // }

  // isCurrentUserIsInSubPeriod(){
  //   if (new Date(this.currentUser.paiement.stripe.current_period_end) > new Date())
  //     return true;
  //   return false
  //
  // }
  // isCurrentUserHasCompanie(){
  //   if(this.currentUser.companies.length)
  //     return true
  //   return false
  // }




  getUser(id: string) {
    // if(!id) {
    //   // console.log(this.currentUser)
    //   if(this.currentUser._id) {
    //     // console.log(this.currentUser)
    //     return Observable.of(this.currentUser)
    //   }
    // }

    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.get(this.url + 'profile/' + id, {headers: headers})
      .map((response: Response) => {

      //  if(!id) {
      //    this.authService.refreshCookiesOfCurrentUser( response.json().user)
      // //   console.log(this.currentUser)
      //  }

        return response.json().user;

      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  deleteUser(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.delete(this.url + 'profile/' + id, {headers: headers})
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

  saveUser(user: any) {
    user.profile.parentUser=[]
  //  console.log(this.authService.currentUser.userId)
    user.profile.parentUser.push(this.authService.currentUser.userId)
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
  //  let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'profile/',body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }



  updateUser(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'profile/' + user._id, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updateDateSeeLatestNotif(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'profile/' + user._id + '/dateSeeLatestNotif', body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }




  // addCompanieToMyself(companie: Companie) {
  //   const body = JSON.stringify(companie);
  //   const headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   return this.http.put(this.url + 'profile/addCompanieToMyself/', body, {headers: headers})
  //     .map(response => response.json())
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }


  // getUserDetails(userId: string) {
  //   if (this.authService.isLoggedIn()) {
  //     let token = this.authService.currentUser.token
  //     let userId = this.authService.currentUser.userId
  //     let headers = new Headers({'Content-Type': 'application/json'});
  //     headers.append('Authorization', '' + token);
  //     return this.http.get(this.url + userId, {headers: headers})
  //       .map((response: Response) => response.json())
  //       .catch((error: Response) => {
  //         this.errorService.handleError(error.json());
  //         return Observable.throw(error.json());
  //       });
  //   }
  // }


  // updateUser(user: User) {
  // //  console.log(user)
  //   const body = JSON.stringify(user);
  //   const headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.token);
  //   return this.http.put( '/profile/' + user._id, body, {headers: headers})
  //     .map(response => response.json())
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }



  // submit the new password via the form in front end
  newPassword(newPass: newPassword) {
    if (this.authService.isLoggedIn()) {
      let token = localStorage.getItem('id_token');
      const body = JSON.stringify(newPass);
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.append('Authorization', '' + token);
      return this.http.post('/profile/password', body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => {
          this.errorService.handleError((error.json()));
          return Observable.throw(error.json());
        });
    }
  }

}
