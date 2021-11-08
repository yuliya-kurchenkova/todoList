import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User, Task } from '../../../shared/interfaces/interfaces';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MyTask } from './task';
import { baseURL } from '../../../../environments/environment';


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
  };

  public logout(): void {
    this.fireAuth.signOut();
    localStorage.removeItem('uid');
    this.stream$.next(this.isSignedIn);
  };

  public changeIsSignedIn(bool: boolean): void {
    this.isSignedIn = bool;
    this.stream$.next(this.isSignedIn);
  };

  public signUp(user: User): Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password);
  };

  public remove(task: Task, uid: string): Observable<any> {
    return this.http.delete(`${baseURL}tasks/${uid}/${task.id}.json`);
  };

  public getTask(task: Task, uid: string): Observable<any> {
    return this.http.get(`${baseURL}tasks/${uid}.json`);
  };

  public updateTask(myTask: MyTask, uid: string, id: string): Observable<any> {
    return this.http.put(`${baseURL}tasks/${uid}/${id}.json`, myTask);
  };

  public updateActiveStatus(myTask: MyTask, uid: string, id: string): Observable<any> {
    const body = {...myTask, status: 'active'};
    return this.http.put(`${baseURL}tasks/${uid}/${id}.json`, body);
  };

  public updateDoneStatus(myTask: MyTask, uid: string, id: string): Observable<any> {
    const body = {...myTask, status: 'done'};
    return this.http.put(`${baseURL}tasks/${uid}/${id}.json`, body);
  };

}





