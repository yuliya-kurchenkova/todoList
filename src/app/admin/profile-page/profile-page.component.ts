import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces'
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  providers: [AuthService]
})
export class ProfilePageComponent implements OnInit {

  public user!: User;

  constructor(
    private auth: AuthService
  ){}

  ngOnInit(){

  }

  // logInJ() {
  //   this.auth.profile()
  //     .subscribe((data:any) => this.user= data.email);
  // }

}
