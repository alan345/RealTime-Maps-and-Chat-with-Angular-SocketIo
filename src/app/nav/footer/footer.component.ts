import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() sidenav: any;


  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}


  ngOnInit() {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }


}
