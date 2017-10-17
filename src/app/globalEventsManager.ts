import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class GlobalEventsManager {

    private _showNavBarLeft: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public showNavBarEmitterLeft: Observable<any> = this._showNavBarLeft.asObservable();

    private _showNavBarTop: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public showNavBarEmitterTop: Observable<any> = this._showNavBarTop.asObservable();

    private _showNavBarRight: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public showNavBarEmitterRight: Observable<any> = this._showNavBarRight.asObservable();

    private _refreshCenter: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public refreshCenterEmitter: Observable<any> = this._refreshCenter.asObservable();

    constructor() {}

    showNavBarLeft(ifShow: any) {
        this._showNavBarLeft.next(ifShow);
    }
    showNavBarTop(ifShow: any) {
        this._showNavBarTop.next(ifShow);
    }
    showNavBarRight(ifShow: any) {
      // console.log(ifShow.showNavBar)
        this._showNavBarRight.next(ifShow);
        // return ifShow.showNavBar
    }
    refreshCenter(ifShow: boolean) {
        this._refreshCenter.next(ifShow);
    }
}
