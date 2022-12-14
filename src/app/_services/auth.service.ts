import { Injectable } from '@angular/core';
import { SignInData } from '../modal/signIn';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

    private readonly mockUser: SignInData = new SignInData('user@mail.com', 'Password@123');
    isAuthenticated = false;
    
    constructor(private router: Router) { }

    authenticate(signInData: SignInData): boolean {
      if (this.checkCredentials(signInData)) {
        this.isAuthenticated = true;
        this.router.navigate(['/home']);
        return true;
      }
      this.isAuthenticated = false;
      return false;
    }
    private checkCredentials(signInData: SignInData): boolean {
      return this.checkLogin(signInData.getLogin()) && this.checkPassword(signInData.getPassword());
    }

    private checkLogin(login: string): boolean {
      return login === localStorage.getItem("email");
    }
  
    private checkPassword(password: string): boolean {
      return password === localStorage.getItem("password"); // this.mockUser.getPassword();
    }

    logout() {
      this.isAuthenticated = false;
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      this.router.navigate(['']);
    }
}