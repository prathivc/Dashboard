import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { SignInData } from '../modal/signIn';
import { NgForm } from '@angular/forms';

interface IUser {
  // name: string;
  // nickname: string;
  // email: string;
  // password: string;
  showPassword: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  show = false;
  user: IUser;
  email= new FormControl();
  password= new FormControl();
  pwdErrorMgs!: string;
  pwdPattern!: string;
  emailPattern!: string;
  emailErrorMgs!: string;

  isFormValid = false;
  areCredentialsInvalid = false;
  isAuthenticated = false;

  constructor( private auth: AuthService, private router: Router, private formBuilder: FormBuilder ) {
    this.user = {} as IUser;
  }

  ngOnInit(): void {
    this.pwdPattern =
      '^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{9,}$'; 
    this.pwdErrorMgs = 'Password must have min 9 char, atleast 1 Uppercase, 1 Lowercase, 1 number and 1 Special charter';
    this.emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    this.emailErrorMgs ='Email Invalid';
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.pwdPattern)])
    });
  }

  get data() { return this.loginForm.controls; }

  onSubmit() {  
    if (this.loginForm.invalid) {
      return;
    } else if (this.data['email'].value == localStorage.getItem("email") && this.data['password'].value == localStorage.getItem("password")) {
      
      console.log(localStorage.getItem("email"));
      console.log(localStorage.getItem("password"));
      this.router.navigate(['/home']);
    } else {  
      this.submitted = true;
    }
  }
  //   onSubmit() {
  //     if (!this.loginForm.valid) {
  //       this.isFormValid = true;
  //       this.areCredentialsInvalid = false;
  //       return;
  //     }
  //     this.checkCredentials(loginForm);
  
  //   }

  //   private checkCredentials(loginForm: NgForm) {
  //   const signInData = new SignInData(loginForm.value.email, loginForm.value.password);
  //   if (!this.auth.authenticate(signInData)) {
  //     this.isFormValid = false;
  //     this.areCredentialsInvalid = true;
  //   }
  // }

  // onSubmit(loginForm: NgForm) {
  //   if (!loginForm.valid) {
  //     this.isFormValid = true;
  //     this.areCredentialsInvalid = false;
  //     return;
  //   }
  //   this.checkCredentials(loginForm);

  // }

  // private checkCredentials(loginForm: NgForm) {
  //   const signInData = new SignInData(loginForm.value.login, loginForm.value.password);
  //   if (!this.auth.authenticate(signInData)) {
  //     this.isFormValid = false;
  //     this.areCredentialsInvalid = true;
  //   }
  // }

  signUp() {
    this.isAuthenticated = false;
    this.router.navigate(['register']);
  }

}
