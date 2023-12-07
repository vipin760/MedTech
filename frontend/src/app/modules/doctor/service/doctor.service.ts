import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../shared/model/Doctor.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IDoctor } from '../shared/interface.ts/Doctor.interface';
import { ToastrService } from 'ngx-toastr';
import { IListPatient } from '../shared/interface.ts/IListPatient';
import { DOCTOR_GET_ALL_PATIENTS_URL } from '../shared/constants/urls';

const DOCTOR_KEY='Doctor'

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private doctorSubject = new BehaviorSubject<Doctor>(new Doctor())
  public doctorObservable!:Observable<Doctor>;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService
  ) { 
    this.doctorObservable = this.doctorSubject.asObservable()
  }
/////////////////////////////////////////////////////////////////////////////////////
  doctorLogin(doctorData:IDoctor):Observable<Doctor>{
   return this.http.post<Doctor>("http://localhost:3000/api/doctor/login",doctorData).pipe(
    tap({
      next:(doctor)=>{
        this.SetDoctorToLocalStorage(doctor)
        this.doctorSubject.next(doctor)
        this.toastrService.success(`welcome ${doctor.name} from MedTech Hospital`,`Login success`)
      },
      error:(errorRes)=>{
        this.toastrService.error(`${errorRes.error.message}`,`Login Failed`)
      }
    })
   )
  }

/////////////////////////////////////////////////////////////////////////////////////

private SetDoctorToLocalStorage(doctor:Doctor){
 localStorage.setItem(DOCTOR_KEY,JSON.stringify(doctor))
}

/////////////////////////////////////////////////////////////////////////////////////
private GetDoctorFromLocalStorage():Doctor{
  const doctorJson = localStorage.getItem(DOCTOR_KEY)
  if(doctorJson){
    return JSON.parse(doctorJson) as Doctor
  }else{
    return new Doctor()
  }
}

/////////////////////////////////////////////////////////////////////////////////////
 logoutDoctor(){
  this.doctorSubject.next(new Doctor())
  localStorage.removeItem(DOCTOR_KEY)
  window.location.reload()
}
/////////////////////////////////////////////////////////////////////////////////////

fetchPatients():Observable<any>{
  return this.http.get<IListPatient>(DOCTOR_GET_ALL_PATIENTS_URL)
}


/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////

}