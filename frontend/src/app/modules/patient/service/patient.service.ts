import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PatientLogin } from '../shared/model/Patient.Login.model';
import { HttpClient } from '@angular/common/http';
import { IPatientsLogin } from '../shared/interface/IPatientLogin';
import { PATIENTS_LOGIN_URL, PATIENTS_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IPatientRegister } from '../shared/interface/IPatientRegister';
const PATIENT_KEY='Patientsss'

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private PatientSubject = new BehaviorSubject<PatientLogin>(this.getPatientFromLocalStorage())
  public PatientObservable!:Observable<PatientLogin> 

  constructor(private http: HttpClient, private toastrService: ToastrService) {
 this.PatientObservable = this.PatientSubject.asObservable()
   }
//////////////////////////////////////////////////////////////////////////////////////////////
  loginPatients(patientData:IPatientsLogin):Observable<PatientLogin>{
   return this.http.post<PatientLogin>(PATIENTS_LOGIN_URL,patientData).pipe(
    tap({
      next:(patients)=>{
        this.setPatientToLocalStorage(patients)
        this.PatientSubject.next(patients)
        this.toastrService.success(`login success`,`welcome your world`)
      },
      error:(errRes)=>{
        this.toastrService.error(errRes.error,"login failed")
      }
    })
   )
  }

 //////////////////////////////////////////////////////////////////////////////////////////////
 private setPatientToLocalStorage(patient:PatientLogin){
  localStorage.setItem(PATIENT_KEY, JSON.stringify(patient))
 }
 //////////////////////////////////////////////////////////////////////////////////////////////
 private getPatientFromLocalStorage():PatientLogin{
  const patientKey = localStorage.getItem(PATIENT_KEY)
  if(patientKey){
    return JSON.parse(patientKey) as PatientLogin
  }else{
    return new PatientLogin()
  } 

 }

 //////////////////////////////////////////////////////////////////////////////////////////////
logout(){
  this.PatientSubject.next(new PatientLogin())
  localStorage.removeItem(PATIENT_KEY)
  window.location.reload()
}
//////////////////////////////////////////////////////////////////////////////////////////////

patientRegister(patientData:IPatientRegister):Observable<IPatientRegister>{
 return this.http.post<IPatientRegister>(PATIENTS_REGISTER_URL,patientData).pipe(
  tap({
    next:(patients)=>{
      this.toastrService.success(`Hello ${patients.name} welcome to MedTech Hospital`,`Register Successfully`)
    },
    error:(errorRes)=>{
      this.toastrService.error(`invalid register ${errorRes.error.message} `,`failed Registration`)
    }
  })
 )
}

//////////////////////////////////////////////////////////////////////////////////////////////

}
