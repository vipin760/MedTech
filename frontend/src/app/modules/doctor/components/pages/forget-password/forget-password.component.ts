import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '../../../service/doctor.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit{
  emailForm!:FormGroup;
  isSubmitted:boolean=false

  constructor(
    private fb:FormBuilder,
    private doctorService:DoctorService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email:["",[Validators.email,Validators.required]]
    })
  }
  get fc(){
    return this.emailForm.controls
  }
  submit(){
    this.isSubmitted = true
    if(this.emailForm.invalid) return
    this.doctorService.forgetpassword(this.emailForm.value).subscribe(()=>{
      this.router.navigate(["reset-password"])
    })

  }
}
