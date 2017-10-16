import {Component, OnInit, ViewChild, ElementRef, Renderer, AfterViewInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {newPassword} from '../../user.model';

import { AuthService} from '../../../auth/auth.service';
import { UserService} from '../../user.service';
import { User } from '../../user.model'
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.css']
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {
  fetchedUser : User = new User()
  myForm: FormGroup;
  resetPasswordForm: FormGroup;
  currentPassword: FormControl;
  newPassword: FormControl;
  @ViewChild('userPassword') userPassword: ElementRef;

  constructor(private fb: FormBuilder,
    private router: Router, private toastr: ToastsManager,
    private renderer: Renderer,
    private authService: AuthService,
    private userService: UserService,
    private location: Location,
  ) {
  }

  ngOnInit() {

    this.currentPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.newPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.resetPasswordForm = this.fb.group({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
    })
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
    })
    this.getUser(this.authService.currentUser.userId)
  }

  goBack() {
    this.location.back();
  }

  getUser(id : string) {
    this.userService.getUser(id)
      .subscribe(
        res => {
          this.fetchedUser = <User>res
        },
        error => {
          console.log(error);
        }
      )
  }



  // focus on 'current password' input box after content is initialized
  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.renderer.invokeElementMethod(this.userPassword.nativeElement, 'focus', []);
    // }, 50);
  }

  save() {
    this.userService.updateUser(this.fetchedUser)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
          this.router.navigate(['/']);
        },
        error => {console.log(error)}
      )
  }
  // submit the password change form to the backend with the new desired credentials
  onSubmit() {
    const newPass = new newPassword(this.resetPasswordForm.value.currentPassword, this.resetPasswordForm.value.newPassword);
    this.userService.newPassword(newPass)
      .subscribe(
        data => {
          // after successfull registration, the user is redirected to the login page
          //this.router.navigate(['/user/login']);

          this.authService.logout();
          let this2 = this
          setTimeout(function(){
              this2.router.navigate(['/user/login']);
          }, 150);
        //  localStorage.removeItem('id_token');
          // toastr message pops up to inform user that the registration was successfull
          //this.toastr.success('Please login with your new password', 'Password changed');
        }
      );
  }
}
