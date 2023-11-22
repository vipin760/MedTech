import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../../service/patient.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
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
