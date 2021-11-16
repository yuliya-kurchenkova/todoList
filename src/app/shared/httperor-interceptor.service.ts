import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor, HttpResponse
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable()
// export class HttpErrorInterceptorService implements HttpInterceptor {
//
//   constructor() {
//   }
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const auth = request.clone({
//       headers: request.headers.set('iskraAuth', '123456')
//     });
//     return next.handle(auth)
//       .pipe(
//         tap((event) => {
//           if (event instanceof HttpResponse) {
//             console.log('This is request');
//           }
//         }, (err) => {
//           if (err instanceof HttpErrorResponse) {
//             console.log('This is Error');
//           }
//         })
//       )
//   }
// }

export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const errMsg = 'Hi';
        console.log(error);
        console.log(errMsg);

        return throwError(error)
    })
    )
  }
}
