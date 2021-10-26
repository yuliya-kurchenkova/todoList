import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

//  export interface ComponentCanActive{
//      canActive: () => boolean | Observable<boolean>
//  }
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.isAuthenticated()) {
        return true;
    } else {
        this.auth.logout();
        this.router.navigate(['/admin', 'login'], {
            queryParams: {
                loginAgain: true
            }
        });
    }
    return true
    }
}
