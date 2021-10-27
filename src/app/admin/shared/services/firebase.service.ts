import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { User } from "../../../shared/interfaces";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class FirebaseService {

  public newUser: any
  public curentUserId: any
  public displayName: any
  public userData!: User
  sss: any


  constructor(
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
  ) {
  }

  // public signUp(user: User): Promise<any> {
  //   return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password)
  //     .then((result) => {
  //       console.log(result)
  //       this.newUser = result.user;
  //       console.log(this.newUser)
  //       this.curentUserId = this.newUser.uid;
  //       console.log(this.curentUserId)
  //       this.displayName = this.newUser.firstName + ' ' + this.newUser.lastName
  //       console.log(this.displayName)
  //       const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}.json`);
  //       console.log(userRef)
  //       const userData = {
  //         uid: this.curentUserId,
  //         email: user.email,
  //         displayName: user.firstName + ' ' + user.lastName,
  //       }
  //       console.log(userData)
  //       const sss = userRef.set(userData)
  //        this.http.post(`https://todo-angular-d27e2-default-rtdb.europe-west1.firebasedatabase.app/users/${userData.uid}.json`, userData).subscribe(s => {
  //         console.log(s)
  //       })
  //       console.log(sss)
  //       return console.log(sss)
  public signUp(user: User): Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        console.log(result)
        this.newUser = result.user;
        console.log(this.newUser)
        this.curentUserId = this.newUser.uid;
        console.log(this.curentUserId)
        this.displayName = this.newUser.firstName + ' ' + this.newUser.lastName
        console.log(this.displayName)
        const userData = {
          uid: this.curentUserId,
          email: user.email,
          displayName: user.firstName + ' ' + user.lastName,
        }
        console.log(userData)
        this.writeUserData(this.userData)
        this.http.post(`https://todo-angular-d27e2-default-rtdb.europe-west1.firebasedatabase.app/users/${userData.uid}.json`, userData).subscribe(s => {
          console.log(s)
        })



        // this.setUserData(this.newUser)
        // r.updateProfile({displayName: this.newUser.firstName + ' ' + this.newUser.lastName})
        // console.log("setUserData2", r)
      })
    // this.db.doc(`/users/`)
    // .set({
    //   email: this.newUser.email,
    //   displayName: this.newUser.firstName + this.newUser.lastName,
    // })

  }
  writeUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}.json`);
    console.log(userRef)
    const sss = userRef.set(user)
  }

  // setUserData(user: User): Promise<any> {
  //   const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
  //   console.log(userRef)
  //   const userData = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.firstName + ' ' + user.lastName,
  //   }
  //   console.log(userData)
  //   return userRef.set(userData)
  // }
  //
  // async createNewAccount() {
  //   try {
  //     const user = await this.fireAuth.createUserWithEmailAndPassword(user.email, user.password);
  //     console.log(user)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  // signup(user: User) {
  //   this.fireAuth.createUserWithEmailAndPassword(user.email, user.password)
  //     .then(result => {
  //       console.log(result)
  //       this.newUser = result.user;
  //       console.log(this.newUser)
  //       this.curentUserId = this.newUser.uid;
  //       userRef.push(user)
  //         .then(snap => console.log(snap))
  // })
  // }


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
