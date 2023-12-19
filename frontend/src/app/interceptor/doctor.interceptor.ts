import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class DoctorTokenInterceptorService implements HttpInterceptor{

    constructor(){}
    intercept(_req: HttpRequest<any>, _next: HttpHandler): Observable<HttpEvent<any>> {
       let doctorData = localStorage.getItem('Doctor')
       console.log("doctorData",doctorData)
       const doctorParse = doctorData?JSON.parse(doctorData):''
       const token = doctorParse? doctorParse.token:null
       console.log("token",token)
        let jwttoken = _req.clone({
            setHeaders:{
                'x-auth-doctor-token':token ? token :''
          
            }
        })
        console.log("jwttoken",jwttoken)
        return _next.handle(jwttoken)
    } 
}
