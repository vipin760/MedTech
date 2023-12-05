import { Injectable} from '@angular/core';
import { IAdmin } from '../shared/interface/IAdmin';
import { AdminLogin } from '../shared/model/Admin.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ADMIN_ADD_DOCTOR_URL, ADMIN_BLOCK_DOCTORS_URL, ADMIN_GET_ALL_DOCTORS_URL, ADMIN_LOGIN_URL, ADMIN_UNBLOCK_DOCTORS_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IDoctor } from '../../doctor/shared/interface.ts/Doctor.interface';
import { IPostDoctor } from '../shared/interface/IDoctor';
import { IListDoctors } from '../shared/interface/IListDoctors';
import { IDoctor_Block_unblock } from '../shared/interface/IDoctorBlock_unblock';

const ADMIN_KEY="Admin"
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminSubject = new BehaviorSubject<AdminLogin>(this.GetAdminFromLocalStorage())
  private currentDoctorsSubject = new BehaviorSubject<IListDoctors|null>(null)
  currentDoctorsList$ = this.currentDoctorsSubject.asObservable()
  public adminObservable!:Observable<AdminLogin>;

  constructor( 
    private http:HttpClient,
    private toastrService: ToastrService,
  ) { 
    this.adminObservable = this.adminSubject.asObservable()
  }

////////////////////////////////////////////////////////////////////
loginAdmin(adminData:IAdmin):Observable<AdminLogin>{
 return this.http.post<AdminLogin>(ADMIN_LOGIN_URL,adminData).pipe(
  tap({
    next:(admin) =>{
      this.SetadminToLocalStorage(admin)
      this.adminSubject.next(admin)
      this.toastrService.success(`welcome ${admin.name} from MedTech hospital`,`Login success`)
    },
    error:(errorRes) =>{
      this.toastrService.error(errorRes.error.message,`login failed`)
    }
  })
 )
}
////////////////////////////////////////////////////////////////////

private SetadminToLocalStorage(adminData:AdminLogin){
  localStorage.setItem(ADMIN_KEY,JSON.stringify(adminData))
}

////////////////////////////////////////////////////////////////////
private GetAdminFromLocalStorage():AdminLogin{
  
  const AdminData=localStorage.getItem(ADMIN_KEY)
  if(AdminData){
    return JSON.parse(AdminData) as AdminLogin
  }else{
    return new AdminLogin()
  }
}

////////////////////////////////////////////////////////////////////
logout(){
 this.adminSubject.next(new AdminLogin())
 localStorage.removeItem(ADMIN_KEY)
 window.location.reload()
}
////////////////////////////////////////////////////////////////////

addDoctor(doctorData:IPostDoctor):Observable<any>{
return this.http.post<IPostDoctor>(ADMIN_ADD_DOCTOR_URL,doctorData).pipe(
  tap({
    next:(doctor)=>{
      this.toastrService.success(`${doctor.message}`,'Succcess')
    },
    error:(errorRes)=>{
      this.toastrService.error(`${errorRes.error.message}`, 'Failed');
    }
  })
)
}
 
////////////////////////////////////////////////////////////////////
listAllDoctors():Observable<any>{
  return this.http.get<IListDoctors[]>(ADMIN_GET_ALL_DOCTORS_URL)
}

////////////////////////////////////////////////////////////////////

toggleStatus(id:string,currentDoctorStatus:boolean):Observable<IDoctor_Block_unblock>{
  const currentDoctor = currentDoctorStatus
  const isBlocked = currentDoctorStatus

  return this.http.patch<IDoctor_Block_unblock>(
    isBlocked ? ADMIN_UNBLOCK_DOCTORS_URL : ADMIN_BLOCK_DOCTORS_URL,{id}
  ).pipe(
    tap({
      next:(doctors)=>{
        this.toastrService.success(`${doctors.message}`,'Success')
       
      },
      error:(errorRes) => {
        this.toastrService.error(`${errorRes.error.message}`,"Failed")
      }
    })
  )

}


////////////////////////////////////////////////////////////////////




}
