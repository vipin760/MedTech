import { Injectable } from '@angular/core';
import { IAdmin } from '../shared/interface/IAdmin';
import { AdminLogin } from '../shared/model/Admin.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ADMIN_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const ADMIN_KEY="Admin"
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminSubject = new BehaviorSubject<AdminLogin>(this.GetAdminFromLocalStorage())
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
}
