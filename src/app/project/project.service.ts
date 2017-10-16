import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {Project} from './project.model';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class ProjectService {

  private url: string = '/';
//  private token: string = localStorage.getItem('id_token');
//  private projectId: string = localStorage.getItem('projectId');
  // private projects = [];
  // private singleProject = Object;

  constructor(
    private http: Http,
    private errorService: ErrorService,
    private toastr: ToastsManager,
    private authService: AuthService) {}



  getProjects(page: number, search: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'project/page/' + page , options)
      .timeout(9000)
      .map((response: Response) => {

        const projects = response.json();

        return projects;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  getTasks(page: number, search: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'project/unwind/'  , options)
      .timeout(9000)
      .map((response: Response) => {

        const projects = response.json();

        return projects;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }



  countNewItemForUser(){
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers});
    return this.http.get(this.url + 'project/countNewItemForUser/' + this.authService.currentUser.userId, options)
      .timeout(9000)
      .map((response: Response) => {
        const projects = response.json();
        return projects;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  //getProject(id: string) : Observable<Project> {
  getProject(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.get(this.url + 'project/' + id, {headers: headers})
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


  updateTask(newTaskData, project) {
    const body = JSON.stringify(newTaskData);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'project/updateTask/' + project._id, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  deleteProject(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.delete(this.url + 'project/' + id, {headers: headers})
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

  saveProject(project : Project) {
    //  console.log("this.authService.currentUser.token",this.authService.currentUser.token);
    //  delete project._id;
    delete project._id
    //console.log(project)
    const body = JSON.stringify(project);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'project/',body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        // this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updateProject(project) {
    let projectTemp = JSON.parse(JSON.stringify(project))
    projectTemp.bucketTasks.forEach((bucketTask, i) => {
      console.log(bucketTask.tasks)

      bucketTask.tasks.forEach((task, j) => {
        task.assignedTos.forEach((assignedTo, k) => {
          let assignedToId = assignedTo._id
          projectTemp.bucketTasks[i].tasks[j].assignedTos = []
          projectTemp.bucketTasks[i].tasks[j].assignedTos.push({
            _id: assignedToId
          })
        })
      })
    })
    // console.log(projectTemp)
    const body = JSON.stringify(projectTemp);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'project/' + project._id, body, {headers: headers})
      .map(response => response.json())
      .catch((error) => {
        console.log(error)
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  //
  // deleteForm(form: Form) {
  //   this.forms.splice(this.forms.indexOf(form), 1);
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   return this.http.delete(this.url + 'forms/' + form, {headers: headers})
  //     .map((response: Response) => {
  //       this.toastr.success('Form deleted successfully!');
  //       response.json();
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }
  //
  // getSingleForm(formId) {
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   return this.http.get(this.url + 'forms/edit/' + formId, {headers: headers})
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
