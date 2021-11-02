import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from "../../../shared/interfaces";
import { Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public isSignedIn: boolean = false;

  public stream$ = new Subject<boolean>();

  constructor(private fireAuth: AngularFireAuth) {
  }

  public signIn(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  public logout(): void {
    this.fireAuth.signOut();
    }

  public changeIsSignedIn(bool:boolean): void {
    this.isSignedIn = bool;
    this.stream$.next(this.isSignedIn);
  }

  public signUp(user: User): Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password);
  }
}



