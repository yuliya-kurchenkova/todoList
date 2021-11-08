import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FbAuthResponse } from '../../../shared/interfaces/interfaces';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  public get token(): string {
    const expDate = new Date(this.localStorageService.get('fb-token-exp')!);
    if (new Date() > expDate) {
      this.logout();
      return '';
    }
    return this.localStorageService.get('fb-token')!;
  }

  public logout(): void {
    this.setToken(null);
  }

  private setToken(response: FbAuthResponse | null): any {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response!.expiresIn * 1000);
      this.localStorageService.set('fb-token', response!.idToken);
      this.localStorageService.set('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  };
}

