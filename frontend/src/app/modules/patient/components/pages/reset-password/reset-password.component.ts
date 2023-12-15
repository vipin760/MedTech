import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../../service/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordMatchValidator } from '../../../shared/validators/passwordMatchValidators';
import { PasswordValidatorStrong } from '../../../shared/validators/passwordstrong';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  resetForm!:FormGroup;
  isSubmitted:boolean=false
  token!:string;

  constructor(
    private fb:FormBuilder,
    private patientService:PatientService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ){
    this.token=this.activatedRoute.snapshot.paramMap.get('id') ?? ''
  }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password:["",[Validators.required,Validators.pattern,Validators.min(6),PasswordValidatorStrong.strong]],
      cpassword:["",[Validators.required]]
    },{
      validator:PasswordMatchValidator('password','cpassword')
    })
  }
  get fc(){
    return this.resetForm.controls
  }
  submit(){
    this.isSubmitted=true
    if(this.resetForm.invalid) return;
    this.patientService.resetPassword(this.token,this.resetForm.value).subscribe(()=>{
      this.router.navigate(["login"])
    })

  }
}
