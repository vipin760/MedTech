git for-each-ref --sort=-committerdate refs/heads/ --format='%(refname:short)' --count=1

step 1:
create a component 
export class LoginComponent implements OnInit{ 
  loginForm!:FormGroup;
  isSubmitted:boolean=false
  returnUrl:string = ''
  
  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private activateRoute : ActivatedRoute,
    private router: Router
  ){}
   ngOnInit(): void {
     this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',Validators.required]
     })
     this.returnUrl = this.activateRoute.snapshot.queryParams['returnUrl']
   }

   get fc(){
   return this.loginForm.controls
   }
   submit(){
    this.isSubmitted=true;
    console.log(this.loginForm.invalid, this.fc['email'],this.fc['password']);
    
    if(this.loginForm.invalid) return ;
    this.patientService.loginPatients({email:this.fc['email'].value, password:this.fc['password'].value}).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl)
    })


   }

}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

<div class="login-form">
   <mat-card>
    <mat-card-header>
        <app-title text="Login"></app-title>
    </mat-card-header>
    <mat-card-content>
      <form action="" [formGroup]="loginForm" (ngSubmit)="submit()">
        <table>
            <tr>
                <td> <text-input
                    label="Email" type="email" [control]="this.fc['email']" [showErrorWhen]="isSubmitted" 
                    > 
                    </text-input>
                </td>
            </tr>
            <tr>
                <td><text-input
                    label="Password" type="text" [control]="this.fc['password']"  [showErrorWhen]="isSubmitted"
                    ></text-input></td>
            </tr>
            <tr>
                <td>
                    <default-button text="Login"></default-button>
                </td> 
            </tr>
           </table>
    </form>
    </mat-card-content>
   </mat-card>
</div>

css
.login-form{
    display: flex;
    margin-top: 25px;
    height: auto;
    width: 100%;
    justify-content: center;
}
.mat-card{
    height: auto;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


step 2 service




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

}

///////////////////////////////////////////////////////////////////////////////////

create a model and interface and url

/////////////////////////////////////////////////////////////////////////////////


backend
import express from 'express'
import cors from 'cors' 

const app = express()
app.use(cors({
  credentials:true,
  origin:["http://localhost:4200"]
}))
app.use(express.json())

//routes
import patients_router from './patients/router'


app.use("/api/patients",patients_router) //////////////////////////////////=>  create path

app.listen(3000,()=>{
  console.log("connected");
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken'

const router = Router()
////////////////////////////////////////////////////////////////////////////////////////////
router.post('/login',(req,res)=>{
    const {email, password} = req.body
    const user = sample_users.find(user=> user.email === email && user.password === password)
    if(user){

       res.status(200).send(generateToken(user))
    }else{
       res.status(404).send("invalid user")
    }
}) 

const generateToken = (user:any)=>{
   const token = jwt.sign({email:user.email, is_admin: user.is_admin },"randomkey",{expiresIn:"30d"})
   user.token = token
   return user

}

////////////////////////////////////////////////////////////////////////////////////////////


export default router


////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


navbar landing page setup

import { Component } from '@angular/core';
import { PatientLogin } from '../../../shared/model/Patient.Login.model';
import { PatientService } from '../../../service/patient.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  patients!:PatientLogin
 constructor(private patientService: PatientService){
 patientService.PatientObservable.subscribe(newPatient=>{
    this.patients = newPatient
  })
 }

////////////////////////////////////////////////////////////////////
logout(){
  console.log("working");
  
  this.patientService.logout()
}

}




////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
got doctor service and check authnticcation token