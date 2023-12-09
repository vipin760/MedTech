import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor, IPrescription } from '../shared/model/Doctor.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IDoctor } from '../shared/interface.ts/Doctor.interface';
import { ToastrService } from 'ngx-toastr';
import { IListPatient, IPatient_Block_unblock } from '../shared/interface.ts/IListPatient';
import { DOCTOR_ADD_PRESCRIPTION_URL, DOCTOR_FETCH_PATIENT_URL, DOCTOR_GET_ALL_PATIENTS_URL, DOCTOR_PATIENT_BLOCK_URL, DOCTOR_PATIENT_UNBLOCK_URL } from '../shared/constants/urls';

const DOCTOR_KEY='Doctor'
const DOCTOR_ID ='DoctorId'

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private doctorSubject = new BehaviorSubject<Doctor>(this.GetDoctorFromLocalStorage())
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
 localStorage.setItem(DOCTOR_ID,JSON.stringify(doctor.id))
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

listPatients():Observable<any>{
  return this.http.get<IListPatient[]>(DOCTOR_GET_ALL_PATIENTS_URL)
}


/////////////////////////////////////////////////////////////////////////////////////
toggleStatus(id:string, currentPatient:boolean):Observable<IPatient_Block_unblock>{
  const url = `${currentPatient? DOCTOR_PATIENT_UNBLOCK_URL : DOCTOR_PATIENT_BLOCK_URL}/${id}`
 return this.http.patch<IPatient_Block_unblock>(url,id).pipe(
  tap({
    next:(data) =>{
      this.toastrService.success(`${data.message}`,"Success")
    },
    error:(error)=>{
      this.toastrService.error(`${error.error.message}`, "Failed")
    }
  })
 )
}
/////////////////////////////////////////////////////////////////////////////////////

fetchPatient(id:string):Observable<any>{
  const url = `${DOCTOR_FETCH_PATIENT_URL}/${id}`
  return this.http.get<IListPatient>(url)
}

/////////////////////////////////////////////////////////////////////////////////////
addPrescription(data:IPrescription,patientId:string,doctorId:string):Observable<any>{
  const url = `${DOCTOR_ADD_PRESCRIPTION_URL}?doctorId=${doctorId}&patientId=${patientId}`
  console.log("working","data",data,"patientId",patientId,"doctorId",doctorId)
 return this.http.post<IPrescription>(url,data)
}
/////////////////////////////////////////////////////////////////////////////////////

}