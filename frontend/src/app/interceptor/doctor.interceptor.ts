import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class DoctorTokenInterceptorService implements HttpInterceptor{

    constructor(){}
    intercept(_req: HttpRequest<any>, _next: HttpHandler): Observable<HttpEvent<any>> {
       let token = localStorage.getItem('Doctor') 
        let jwttoken = _req.clone({
            setHeaders:{
                'x-auth-token':token ? token :''
            }
        })
        return _next.handle(jwttoken)
    } 
}
