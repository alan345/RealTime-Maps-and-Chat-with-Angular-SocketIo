import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';



import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {Map} from './map.model';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from '../auth/auth.service';



@Injectable()
export class MapService {
  private urlSocket = ':5000';
  private socket;

  sendMessage(message) {
    this.socket.emit('add-message', message);
  }

  getMessages(id: string) {
    let observable = new Observable(observer => {
      this.socket = io(this.urlSocket, {
        query: 'r_var='+'room'+id
      });
      this.socket.on('message', (data: Map) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }


//




  private url: string = '/';
//  private token: string = localStorage.getItem('id_token');
//  private mapId: string = localStorage.getItem('mapId');
  // private maps = [];
  // private singleMap = Object;

  constructor(
    private http: Http,
    private errorService: ErrorService,
    private toastr: ToastsManager,
    private authService: AuthService) {}



  getMaps(page: number, search: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'map/page/' + page , options)
      .timeout(9000)
      .map((response: Response) => {

        const maps = response.json();

        return maps;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getMapUnreadInMissions() {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: {}});
    return this.http.get(this.url + 'map/unreadMapInMissions/'  , options)
      .timeout(9000)
      .map((response: Response) => {

        const maps = response.json();

        return maps;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  getMapUnreadInStrats() {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: {}});
    return this.http.get(this.url + 'map/unreadMapInStrats/'  , options)
      .timeout(9000)
      .map((response: Response) => {

        const maps = response.json();

        return maps;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  initMapSocket(page: number, search: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'map/page/' + page , options)
      .timeout(9000)
      .map((response: Response) => {

        const maps = response.json();

        return maps;
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
    return this.http.get(this.url + 'map/unwind/'  , options)
      .timeout(9000)
      .map((response: Response) => {

        const maps = response.json();

        return maps;
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
    return this.http.get(this.url + 'map/countNewItemForUser/' + this.authService.currentUser.userId, options)
      .timeout(9000)
      .map((response: Response) => {
        const maps = response.json();
        return maps;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  //getMap(id: string) : Observable<Map> {
  getMap(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.get(this.url + 'map/' + id, {headers: headers})
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


  updateTask(newTaskData, map) {
    const body = JSON.stringify(newTaskData);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'map/updateTask/' + map._id, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  deleteMap(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.delete(this.url + 'map/' + id, {headers: headers})
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

  saveMap(map : Map) {
    //  console.log("this.authService.currentUser.token",this.authService.currentUser.token);
    //  delete map._id;
    delete map._id
    //console.log(map)
    const body = JSON.stringify(map);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'map/',body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        // this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updateMap(map) {
    let mapTemp = JSON.parse(JSON.stringify(map))
    // mapTemp.bucketTasks.forEach((bucketTask, i) => {
    //   bucketTask.tasks.forEach((task, j) => {
    //     task.assignedTos.forEach((assignedTo, k) => {
    //       let assignedToId = assignedTo._id
    //       mapTemp.bucketTasks[i].tasks[j].assignedTos = []
    //       mapTemp.bucketTasks[i].tasks[j].assignedTos.push({
    //         _id: assignedToId
    //       })
    //     })
    //   })
    // })
    // // console.log(mapTemp)
    const body = JSON.stringify(mapTemp);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'map/' + map._id, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }




}
