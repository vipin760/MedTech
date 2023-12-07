import { Injectable } from '@angular/core';
import { IAdmin } from '../shared/interface/IAdmin';
import { AdminLogin } from '../shared/model/Admin.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  ADMIN_ADD_DOCTOR_URL,
  ADMIN_BLOCK_DOCTORS_URL,
  ADMIN_BLOCK_PATIENTS_URL,
  ADMIN_FETCH_PATIENTS_URL,
  ADMIN_FETCH_UPDATEDOCTOR_URL,
  ADMIN_FETCH_UPDATE_PATIENT_URL,
  ADMIN_GET_ALL_DOCTORS_URL,
  ADMIN_LOGIN_URL,
  ADMIN_UNBLOCK_DOCTORS_URL,
  ADMIN_UNBLOCK_PATIENTS_URL,
  ADMIN_UPDATE_DOCTOR_URL,
  ADMIN_UPDATE_PATIENT_URL,
} from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IDoctor } from '../../doctor/shared/interface.ts/Doctor.interface';
import { IPostDoctor } from '../shared/interface/IDoctor';
import { IListDoctors } from '../shared/interface/IListDoctors';
import { IDoctor_Block_unblock } from '../shared/interface/IDoctorBlock_unblock';
import {
  IUpdateDoctor,
  IUpdateDoctorResponse,
} from '../shared/interface/IUpdateDoctor';
import { IListPatient, IUpdatePatientResponse } from '../shared/interface/IListPatients';
import { IPatient_Block_unblock } from '../shared/interface/IPatient_block_unblock';

const ADMIN_KEY = 'Admin';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminSubject = new BehaviorSubject<AdminLogin>(
    this.GetAdminFromLocalStorage()
  );
  private currentDoctorsSubject = new BehaviorSubject<IListDoctors | null>(
    null
  );
  currentDoctorsList$ = this.currentDoctorsSubject.asObservable();
  public adminObservable!: Observable<AdminLogin>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.adminObservable = this.adminSubject.asObservable();
  }

  ////////////////////////////////////////////////////////////////////
  loginAdmin(adminData: IAdmin): Observable<AdminLogin> {
    return this.http.post<AdminLogin>(ADMIN_LOGIN_URL, adminData).pipe(
      tap({
        next: (admin) => {
          this.SetadminToLocalStorage(admin);
          this.adminSubject.next(admin);
          this.toastrService.success(
            `welcome ${admin.name} from MedTech hospital`,
            `Login success`
          );
        },
        error: (errorRes) => {
          this.toastrService.error(errorRes.error.message, `login failed`);
        },
      })
    );
  }
  ////////////////////////////////////////////////////////////////////

  private SetadminToLocalStorage(adminData: AdminLogin) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(adminData));
  }

  ////////////////////////////////////////////////////////////////////
  private GetAdminFromLocalStorage(): AdminLogin {
    const AdminData = localStorage.getItem(ADMIN_KEY);
    if (AdminData) {
      return JSON.parse(AdminData) as AdminLogin;
    } else {
      return new AdminLogin();
    }
  }

  ////////////////////////////////////////////////////////////////////
  logout() {
    this.adminSubject.next(new AdminLogin());
    localStorage.removeItem(ADMIN_KEY);
    window.location.reload();
  }
  ////////////////////////////////////////////////////////////////////

  addDoctor(doctorData: IPostDoctor): Observable<any> {
    return this.http.post<IPostDoctor>(ADMIN_ADD_DOCTOR_URL, doctorData).pipe(
      tap({
        next: (doctor) => {
          this.toastrService.success(`${doctor.message}`, 'Succcess');
        },
        error: (errorRes) => {
          this.toastrService.error(`${errorRes.error.message}`, 'Failed');
        },
      })
    );
  }

  ////////////////////////////////////////////////////////////////////
  listAllDoctors(): Observable<any> {
    return this.http.get<IListDoctors[]>(ADMIN_GET_ALL_DOCTORS_URL);
  }

  ////////////////////////////////////////////////////////////////////

  toggleStatus(
    id: string,
    currentDoctorStatus: boolean
  ): Observable<IDoctor_Block_unblock> {
    const currentDoctor = currentDoctorStatus;
    const isBlocked = currentDoctorStatus;

    return this.http
      .patch<IDoctor_Block_unblock>(
        isBlocked ? ADMIN_UNBLOCK_DOCTORS_URL : ADMIN_BLOCK_DOCTORS_URL,
        { id }
      )
      .pipe(
        tap({
          next: (doctors) => {
            this.toastrService.success(`${doctors.message}`, 'Success');
          },
          error: (errorRes) => {
            this.toastrService.error(`${errorRes.error.message}`, 'Failed');
          },
        })
      );
  }

  ////////////////////////////////////////////////////////////////////
  fetchDoctor(id: string): Observable<IListDoctors> {
    const url = `${ADMIN_FETCH_UPDATEDOCTOR_URL}/${id}`;
    return this.http.get<IListDoctors>(url);
  }

  ////////////////////////////////////////////////////////////////////

  updateData(
    doctorData: IUpdateDoctor,
    id: string
  ): Observable<IUpdateDoctorResponse> {
    const url = `${ADMIN_UPDATE_DOCTOR_URL}/${id}`;
    return this.http.put<IUpdateDoctorResponse>(url, doctorData).pipe(
      tap({
        next: (data) => {
          this.toastrService.success(data.message, 'Success');
        },
        error: (error) => {
          this.toastrService.error(`${error.error.message}`, 'Failed');
        },
      })
    );
  }
////////////////////////////////////////////////////////////////////


listPatients():Observable<any>{
  return this.http.get<IListPatient[]>(ADMIN_FETCH_PATIENTS_URL)
}

////////////////////////////////////////////////////////////////////

patient_toggleStatus(
  id: string,
  currentPatientStatus: boolean
): Observable<IPatient_Block_unblock> {
  const isBlocked = currentPatientStatus

  return this.http
    .patch<IDoctor_Block_unblock>(
      isBlocked ? ADMIN_UNBLOCK_PATIENTS_URL : ADMIN_BLOCK_PATIENTS_URL,
      { id }
    )
    .pipe(
      tap({
        next: (patient) => {
          this.toastrService.success(`${patient.message}`, 'Success');
        },
        error: (errorRes) => {
          this.toastrService.error(`${errorRes.error.message}`, 'Failed');
        },
      })
    );
}

////////////////////////////////////////////////////////////////////

fetchPatient(id:string):Observable<any>{
  const url = `${ADMIN_FETCH_UPDATE_PATIENT_URL}/${id}`
  return this.http.get<IListPatient>(url)
}

////////////////////////////////////////////////////////////////////

udatePatient(data:IListPatient,id:string):Observable<IUpdatePatientResponse>{
  const url = `${ADMIN_UPDATE_PATIENT_URL}/${id}`
  return this.http.put<IUpdatePatientResponse>(url,data).pipe(
    tap({
      next:(data) => {
        this.toastrService.success(`${data.message}`,"Success")
      },
      error:(error) => {
        this.toastrService.error(`${error.error.message}`, "Failed")
      }
    })
  )
}

////////////////////////////////////////////////////////////////////
}
