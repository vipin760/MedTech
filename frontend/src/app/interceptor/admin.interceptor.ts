import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class AdminTokenInterceptorService implements HttpInterceptor{

    constructor(){}
    intercept(_req: HttpRequest<any>, _next: HttpHandler): Observable<HttpEvent<any>> {
       let adminData = localStorage.getItem('Admin')
       const adminParse = adminData?JSON.parse(adminData):''
       const token = adminParse? adminParse.token:null
        let jwttoken = _req.clone({
            setHeaders:{
                'Authorization':token ? token :''
            }
        })
        return _next.handle(jwttoken)
    } 
}
