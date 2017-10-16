import {Component, OnInit, Renderer, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {User} from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  myForm: FormGroup;
  email: FormControl;
  password: FormControl;
  @ViewChild('userEmail') userEmail: ElementRef;

  constructor(private _fb: FormBuilder, private _authService: AuthService,
              private _router: Router, private toastr: ToastsManager, private renderer: Renderer) {
  }

  ngOnInit() {

    // if the user tries to hit the register page, first we check if he is logged in or not, if he is then we redirect him to the form page
    if (this._authService.isLoggedIn()) {
      this._router.navigateByUrl('/form');
    }

    this.email = new FormControl('', [Validators.required, this.emailValidator]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.myForm = this._fb.group({
      // nameCompanie:['', [Validators.required, Validators.minLength(2)]],
      email: this.email,
      password: this.password,
      profile: this._fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
      })
    });
  }


  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.renderer.invokeElementMethod(this.userEmail.nativeElement, 'focus', []);
    // }, 50);
  }

  // submit the register form to the backend with the user's desired credentials
  onSubmit() {
    //const user = new User(this.myForm.value.email, this.myForm.value.password);
    const user = new User();
    user.email = this.myForm.value.email
    user.password = this.myForm.value.password
    user.profile = this.myForm.value.profile

    this._authService.signup(user)
      .subscribe(
        data => {

          // after successfull registration, the user is redirected to the login page
          this._router.navigate(['/user/login']);
          // toastr message pops up to inform user that the registration was successfull
          this.toastr.success('Please Login', 'Registration Successfull');
        }
      );
  }

// input validator to check if the email entered by the user is actually text in an email form
  emailValidator(control: any) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (!EMAIL_REGEXP.test(control.value)) {
      return {invalidEmail: true};
    }
  }
}
