import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {ErrorService} from '../../errorHandler/error.service';
import {Form} from './form.model';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class FormService {

  private url: string = '/';
  private token: string = localStorage.getItem('id_token');
  private userId: string = localStorage.getItem('userId');
  private forms: Form[] = [];
  private singleForm = Object;

  constructor(
    private http: Http,
    private errorService: ErrorService,
    private toastr: ToastsManager,
    private requestOptions: RequestOptions,
    private authService: AuthService) {}

  // get user forms from backend in order to display them in the front end
  getUserForms(page: number, search: any) {

    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: search });

    return this.http.get(this.url + 'forms/page/' + page, options)
      .timeout(8000)
      .map((response: Response) => {

        return response.json();
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  // getUserFormsByUserId(userId) {
  //   console.log(userId)
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.token);
  //   return this.http.get(this.url + 'forms/form/' + userId, {headers: headers})
  //     .timeout(8000)
  //     .map((response: Response) => {
  //
  //       const forms = response.json().forms;
  //       let fetchedForms = [];
  //       for (let form of forms) {
  //         fetchedForms.push(form);
  //       }
  //
  //       this.forms = fetchedForms;
  //       return fetchedForms;
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }


  deleteForm(form: Form) {
    this.forms.splice(this.forms.indexOf(form), 1);
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.token);
    return this.http.delete(this.url + 'forms/' + form, {headers: headers})
      .map((response: Response) => {
        this.toastr.success('Form deleted successfully!');
        response.json();
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getSingleForm(formId: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.token);
    return this.http.get(this.url + 'forms/edit/' + formId, {headers: headers})
      .map((response: Response) => {
        this.singleForm = response.json();
        return this.singleForm;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  //must be depracted. See options service
  // getSingleFormFromOptions(typeOption, namePage, positionImage) {
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.token);
  //   return this.http.get(this.url + 'forms/singleFormFromOptions/' + typeOption  + '/' + namePage + '/' + positionImage, {headers: headers})
  //     .map((response: Response) => {
  //       this.singleForm = response.json();
  //       return this.singleForm;
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }
}
