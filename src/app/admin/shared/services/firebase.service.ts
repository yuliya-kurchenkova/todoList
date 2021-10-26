import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { User } from "../../../shared/interfaces";


@Injectable()
export class FirebaseService {

  public newUser: any
  public curentUserId: any
  public displayName: any

  constructor(
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) {
  }

  public signUp(user: User): Promise<any>{
    return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        console.log(result)
        this.newUser = result.user;
        this.curentUserId = this.newUser.uid;
        console.log(this.newUser.uid)
        this.displayName = this.newUser.firstName + ' ' + this.newUser.lastName
        console.log(this.displayName)
        this.newUser.updateProfile({displayName: this.newUser.firstName + ' ' + this.newUser.lastName})
        this.db.doc(`/users/`)
        .set({
          email: this.newUser.email,
          displayName: this.newUser.firstName + this.newUser.lastName,    
        })
      })
    } 
      // setUserData(this.newUser).then(r => {
      //   console.log(r)
      // })
      // });
    //
    // this.setUserData()
    //   .then(() => {
    //     this.router.navigate(['/home']);
    //   })
  

  // public setUserData(user: User) {
  //  return this.db.doc(`users/${user.uid}`)
  //    .set({
  //    email: this.newUser.email,
  //    firstname: this.newUser.firstName,
  //    lastname: this.newUser.lastName,
  //  });
  // }
}
