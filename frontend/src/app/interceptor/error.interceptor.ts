// error-handle-interceptor.service.ts
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ErrorHandleInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          console.error("An error occurred:", error.error.message);
          errorMessage = error.error.message;
        } else {
          console.error(`Backend returned code ${error.status}, body was:`, error.error);
          errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
        }
console.log(errorMessage,"");
        return throwError(() => error);
      })
    );
  }
}
