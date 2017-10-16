import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class GlobalEventsManager {

    private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();

    private _showTopNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public showTopNavBarEmitter: Observable<boolean> = this._showTopNavBar.asObservable();


    private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public isLoggedInEmitter: Observable<boolean> = this._isLoggedIn.asObservable();



    constructor() {}

    showNavBar(ifShow: boolean) {
        this._showNavBar.next(ifShow);
    }
    showTopNavBar(ifShow: boolean) {
        this._showTopNavBar.next(ifShow);
    }
    isLoggedIn(ifShow: boolean) {
        this._isLoggedIn.next(ifShow);
    }


}
