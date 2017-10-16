import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { Location } from '@angular/common';
import {Router} from '@angular/router';
import { TranslateService } from '../../translate/translate.service';


@Component({
  selector: 'app-loginInApp',
  templateUrl: './loginInApp.component.html',
  styleUrls: ['./loginInApp.component.css']
})
export class LoginInAppComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private translateService: TranslateService,
  ) {}


  ngOnInit() {

  }

  loginInApp(password: string) {
    let userAuth = {
      email: this.authService.user.email,
      password: password
    }
    this.authService.signin(userAuth).subscribe(
      data => {
        console.log('loginInApp')
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('token', data.token);
        location.reload();
      },
      error => console.log(error)
    );
  }

}
