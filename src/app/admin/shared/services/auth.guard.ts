import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import {AuthService} from "./auth.service";
import {FirebaseService} from "./firebase.service";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private localStorageService: LocalStorageService,
        private auth: AuthService,
        private fire: FirebaseService
    ) { }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      if (this.localStorageService.get('uid')) {
        return true;
      } else {
        this.fire.logout()
        this.router.navigate(['/admin', 'login']);
        return false;
      }
    };
}

