import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class PatientTokenInterceptorService implements HttpInterceptor{

    constructor(){}
    intercept(_req: HttpRequest<any>, _next: HttpHandler): Observable<HttpEvent<any>> {
       let patientData = localStorage.getItem('Patient')
       const patientParse = patientData?JSON.parse(patientData):''
       const token = patientParse? patientParse.token:null
       console.log(token)
        let jwttoken = _req.clone({
            setHeaders:{
                'Authorization':token ? token :''
            }
        })
        return _next.handle(jwttoken)
    } 
}
