import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../service/admin.service';
import { PasswordValidatorStrong } from 'src/app/modules/patient/shared/validators/passwordstrong';
import { PasswordMatchValidator } from 'src/app/modules/patient/shared/validators/passwordMatchValidators';

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
    private adminService:AdminService, 
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
    this.adminService.resetPassword(this.token,this.resetForm.value).subscribe(()=>{
      this.router.navigate(["login"])
    })

  }
}
