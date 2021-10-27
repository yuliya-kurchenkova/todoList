import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces'
import { AuthService } from '../shared/services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  providers: [AuthService]
})
export class ProfilePageComponent implements OnInit {

  public user!: User;
  currentUserId: any
  // user!: Observable<any>

  constructor(
    private auth: AuthService,
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth,
  ){}

  ngOnInit(): void{
    this.fireAuth.authState.subscribe(user => {
      console.log("user", user);
      if(this.user) {
        this.currentUserId = this.db.collection('users').doc()
        console.log(this.currentUserId)
      }
    })
  }

  // logInJ() {
  //   this.auth.profile()
  //     .subscribe((data:any) => this.user= data.email);
  // }

}
