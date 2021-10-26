import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { User } from "../../../shared/interfaces";


@Injectable()
export class FirebaseService {

  public newUser: any


  constructor(
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) {
  }

  public signUp(user: User): Promise<any>{
    return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.newUser = user;
        // result.user.updateProfile( {
        //   displayName: user.firstname + ' ' + user.lastname
        this.setUserData(this.newUser)
        });
      // });
    //
    // this.setUserData()
    //   .then(() => {
    //     this.router.navigate(['/home']);
    //   })
  }

  public setUserData(user: User) {
   return this.db.doc(`users/${user.uid}`)
     .set({
     email: this.newUser.email,
     firstname: this.newUser.firstName,
     lastname: this.newUser.lastName,
   });
  }
}
