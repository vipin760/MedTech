import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../../service/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Doctor-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  isSubmitted:boolean=false;

  constructor(
    private fb:FormBuilder,
    private doctorService:DoctorService,
    private router: Router
  ){

  }
  
  ngOnInit(): void {
    this.loginForm= this.fb.group({
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required]]
    })
  }
  get fc(){
    return this.loginForm.controls
  }

  submit(){
    if(this.loginForm.invalid) return;
    this.doctorService.doctorLogin({email:this.fc['email'].value, password:this.fc['password'].value}).subscribe((data)=>{
      this.router.navigateByUrl('/doctor/login')
    })
  }

}
