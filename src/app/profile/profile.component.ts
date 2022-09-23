import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input('user') data: any;
  user: any;
  generatedNumber: any;

  constructor(
    private _userService: UserService, private _snackBar: MatSnackBar) { 
    this._userService.getUser().subscribe(
      (data: any) => {
        this.user = data.results[0];
        console.log(this.user);
      },
      (err: any) => {
        this._snackBar.open('Something went wrong', 'Error', {
          duration: 2000,
        });
      }
    );}

  ngOnInit(): void {
    this.generatedNumber = Math.floor(100000 * Math.random());
    console.log("Generated Number" + " - " + this.generatedNumber);
  }

}
