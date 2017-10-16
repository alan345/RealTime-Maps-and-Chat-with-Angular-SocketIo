import {Component, OnInit, Input} from '@angular/core';

import {Router} from '@angular/router';


@Component({
  selector: 'app-loadingInApp',
  templateUrl: './loadingInApp.component.html',
  styleUrls: ['./loadingInApp.component.css']
})
export class LoadingInAppComponent implements OnInit {
  @Input() sidenav: any;


  constructor(
    // private authService: AuthService,
    private router: Router,
  ) {}


  ngOnInit() {}


}
