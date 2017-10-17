import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';



import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {Chat} from './chat.model';
import {ToastsManager} from 'ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthService } from '../auth/auth.service';



@Injectable()
export class ChatService {
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
      this.socket.on('message', (data: Chat) => {
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
//  private chatId: string = localStorage.getItem('chatId');
  // private chats = [];
  // private singleChat = Object;

  constructor(
    private http: Http,
    private errorService: ErrorService,
    private toastr: ToastsManager,
    private authService: AuthService) {}



  getChats(page: number, search: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'chat/page/' + page , options)
      .timeout(9000)
      .map((response: Response) => {

        const chats = response.json();

        return chats;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getChatUnreadInMissions() {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: {}});
    return this.http.get(this.url + 'chat/unreadChatInMissions/'  , options)
      .timeout(9000)
      .map((response: Response) => {

        const chats = response.json();

        return chats;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  getChatUnreadInStrats() {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: {}});
    return this.http.get(this.url + 'chat/unreadChatInStrats/'  , options)
      .timeout(9000)
      .map((response: Response) => {

        const chats = response.json();

        return chats;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  initChatSocket(page: number, search: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'chat/page/' + page , options)
      .timeout(9000)
      .map((response: Response) => {

        const chats = response.json();

        return chats;
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
    return this.http.get(this.url + 'chat/unwind/'  , options)
      .timeout(9000)
      .map((response: Response) => {

        const chats = response.json();

        return chats;
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
    return this.http.get(this.url + 'chat/countNewItemForUser/' + this.authService.currentUser.userId, options)
      .timeout(9000)
      .map((response: Response) => {
        const chats = response.json();
        return chats;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  //getChat(id: string) : Observable<Chat> {
  getChat(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.get(this.url + 'chat/' + id, {headers: headers})
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


  updateTask(newTaskData, chat) {
    const body = JSON.stringify(newTaskData);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'chat/updateTask/' + chat._id, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  deleteChat(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.delete(this.url + 'chat/' + id, {headers: headers})
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

  saveChat(chat : Chat) {
    //  console.log("this.authService.currentUser.token",this.authService.currentUser.token);
    //  delete chat._id;
    delete chat._id
    //console.log(chat)
    const body = JSON.stringify(chat);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'chat/',body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        // this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updateChat(chat) {
    let chatTemp = JSON.parse(JSON.stringify(chat))
    // chatTemp.bucketTasks.forEach((bucketTask, i) => {
    //   bucketTask.tasks.forEach((task, j) => {
    //     task.assignedTos.forEach((assignedTo, k) => {
    //       let assignedToId = assignedTo._id
    //       chatTemp.bucketTasks[i].tasks[j].assignedTos = []
    //       chatTemp.bucketTasks[i].tasks[j].assignedTos.push({
    //         _id: assignedToId
    //       })
    //     })
    //   })
    // })
    // // console.log(chatTemp)
    const body = JSON.stringify(chatTemp);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'chat/' + chat._id, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }




}
