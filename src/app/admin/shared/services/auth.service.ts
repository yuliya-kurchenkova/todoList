import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FbAuthResponse, User } from "../../../shared/interfaces";
import { Observable, Subject, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";
import { catchError, tap } from "rxjs/operators";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class AuthService {

  public error$: Subject<string> = new Subject<string>()
  public adminUser: any

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
  }

  public get token(): string {
    const expDate = new Date(this.localStorageService.get('fb-token-exp')!);
    if(new Date > expDate) {
      this.logout()
      return ''
    }
    return this.localStorageService.get('fb-token')!
  }

  public login(user: User | FbAuthResponse): Observable<any> {
    user.returnSecureToken = true
   return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`, user)
     .pipe(
         tap(d => {
          this.localStorageService.set('fb-token', d);
          this.localStorageService.set('fb-token-ex', d);
          console.log(user.idToken)
          console.log(d)
         }),
       catchError(this.handleError.bind(this))
   )
  }

  // public profile(): Observable<any> {
  //   this.adminUser = this.http.get(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`)
  //   return this.adminUser
  // }

  public logout() {
    this.setToken(null)
  }

  public isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Wrong email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Wrong password')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not exist')
        break
    }

    return throwError(error)
  }

  private setToken(response: FbAuthResponse | null): any {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response!.expiresIn * 1000)
      this.localStorageService.set('fb-token', response!.idToken)
      this.localStorageService.set('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
