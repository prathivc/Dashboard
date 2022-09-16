import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { emailValidator } from '../_services/email-validator.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


interface IUser {
  showPassword: boolean;
  showCnfPassword: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  email= new FormControl();
  password= new FormControl();
  cnfPassword= new FormControl();
  pwdErrorMgs!: string;
  pwdPattern!: string;
  emailPattern!: string;
  emailErrorMgs!: string;
  cnfPwdPattern!: string;
  cnfPwdErrMgs!: string;
  show = false;
  user: IUser;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private _snackBar: MatSnackBar) {
    this.user = {} as IUser;
  }

  ngOnInit() {
    this.pwdPattern =
      '^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{9,}$'; 
    this.pwdErrorMgs = 'Password must have min 9 char, atleast 1 Uppercase, 1 Lowercase, 1 number and 1 Special charter';
    this.cnfPwdPattern =
      '^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{9,}$'; 
    this.cnfPwdErrMgs = 'Password must have min 9 char, atleast 1 Uppercase, 1 Lowercase, 1 number and 1 Special charter';
    this.emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    this.emailErrorMgs ='Email Invalid';
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.pwdPattern)]),
      cnfPassword: new FormControl('', [Validators.required, Validators.pattern(this.cnfPwdPattern)])
    }, 
    // {
    //   validators: this.password.bind(this)
    // }
    );
  }

  get data() { return this.registerForm.controls; }

  onSubmit() {    
    if (this.registerForm.invalid) {
      return;
    } else {
      localStorage.setItem("name", this.data['name'].value);
      localStorage.setItem("email", this.data['email'].value);
      localStorage.setItem("password", this.data['password'].value);
      localStorage.setItem("cnfPassword", this.data['cnfPassword'].value);
      this._snackBar.open('Register Successfully', 'Success', {
        duration: 2000,
      });
      this.router.navigate(['/login']);
      console.log(localStorage.getItem("name"));
      console.log(localStorage.getItem("email"));
      console.log(localStorage.getItem("password"));
      console.log(localStorage.getItem("cnfPassword"));
    }
  }

  // password(formGroup: FormGroup) {
  //   const { value: password } = formGroup.get('password');
  //   const { value: confirmPassword } = formGroup.get('confirmpassword');
  //   return password === confirmPassword ? null : { passwordNotMatch: true };
  // }

}
