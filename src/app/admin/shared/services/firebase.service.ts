import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User, Task } from '../../../shared/interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map, tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public isSignedIn: boolean = false;
  public stream$ = new Subject<boolean>();

  constructor(
    private fireAuth: AngularFireAuth,
    private http: HttpClient
  ) { }

  public signIn(email: string, password: string): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  public logout(): void {
    this.fireAuth.signOut();
    localStorage.removeItem('uid');
    this.stream$.next(this.isSignedIn);
  }

  public changeIsSignedIn(bool:boolean): void {
    this.isSignedIn = bool;
    this.stream$.next(this.isSignedIn);
  }

  public signUp(user: User): Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password);
  }

  public remove(task: Task, uid: string): Observable<any> {
    return this.http.delete(`https://todo-angular-d27e2-default-rtdb.europe-west1.firebasedatabase.app/tasks/${uid}/${task.id}.json`);
  }

  public editTask(task: Task, uid: string): Observable<any> {
    return this.http.get(`https://todo-angular-d27e2-default-rtdb.europe-west1.firebasedatabase.app/tasks/${uid}/${task.id}.json`)
      .pipe(
        tap(e => {
          console.log(e)
        })
      )
  }

  public updateTask(task: Task, uid: string, id: string): Observable<any>  {
    return this.http.put(`https://todo-angular-d27e2-default-rtdb.europe-west1.firebasedatabase.app/tasks/${uid}/${id}.json`, task)
  }
  // public getById(id: string): Observable<any> {
  //   return this.http.get(`https://todo-angular-d27e2-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`)
  //     // .pipe(map( (task) => {
  //     //  console.log(task)
  //     // }));
  // }

  // public getById(id: string): Observable<Post> {
  //   return this.http.get(`${environment.fbDbUrl}/posts/${id}.json`)
  //     .pipe(map( (post: Post) => {
  //       return {
  //         ...post,
  //         id,
  //         date: new Date(post.date)
  //       }
  //     }));
  // }
}



