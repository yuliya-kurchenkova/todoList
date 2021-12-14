import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { FirebaseService } from "../admin/shared/services/firebase.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {
  public error: any;

  constructor(
    private firebase: FirebaseService,
    private toastrService: ToastrService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.showErrorMessage(error.message)
        return throwError(error)
    })
    )
  }

  public showErrorMessage(error: any): void {
    this.toastrService.error(`${error}`);
  };
}
