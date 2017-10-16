import {Component, OnInit, Input} from '@angular/core';

import {Router} from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})

export class LoadingComponent implements OnInit {
  @Input() sidenav: any;


  constructor(
    // private authService: AuthService,
    private router: Router,
  ) {}


  ngOnInit() {}


}
