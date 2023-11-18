import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Patients } from '../shared/model/Patients.model';
import { HttpClient } from '@angular/common/http';
import { IPatients } from '../shared/interfaces/IPatients';
import { PATIENTS_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const PATIENTS_KEY = 'Patients'
@Injectable({
  providedIn: 'root'
})
export class PatientsService {
 private PatientSubject = new BehaviorSubject<Patients>(this.getPatientFromLocalStorge())
 public PatientObservable!:Observable<Patients>;

  constructor(private http : HttpClient, private toastrService: ToastrService) {
    this.PatientObservable = this.PatientSubject.asObservable()
   }
////////////////////////////////////////////////////////////


   loginPatients(patientsData:IPatients):Observable<Patients>{
      return this.http.post<Patients>(PATIENTS_LOGIN_URL,patientsData).pipe(
        tap({
          next:(patients)=>{
            this.setPatientToLocalStorage(patients)
            this.PatientSubject.next(patients)
            this.toastrService.success(
              `welcom to MedTech hospital ${patients.name}`,
              `login successfull`
            )
          },
          error:(errorResponse)=>{
            this.toastrService.error(errorResponse.error,'Login Failed')
          }
        })
      )      
   }


///////////////////////////////////////////////////////////////////////////////
private setPatientToLocalStorage(patient:Patients){
  localStorage.setItem(PATIENTS_KEY,JSON.stringify(patient))
}
////////////////////////////////////////////////////////////
private getPatientFromLocalStorge():Patients{
  const patientJson =  localStorage.getItem(PATIENTS_KEY)
  if(patientJson){
    return JSON.parse(patientJson) as Patients
  }else{
    return new Patients()
  }
} 
   
logout(){
  this.PatientSubject.next(new Patients())
  localStorage.removeItem(PATIENTS_KEY);
  window.location.reload()
}
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////

}

