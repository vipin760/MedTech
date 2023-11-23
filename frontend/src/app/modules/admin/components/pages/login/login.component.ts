import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  isSubmitted:boolean=false;
  returnUrl:string=""

  constructor(
    private fb:FormBuilder,
    private adminService:AdminService,
    private activateRoute:ActivatedRoute,
    private router:Router,
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',Validators.required]
    })
  
  }

 get fc(){
    return this.loginForm.controls
  }
  submit(){
    if(this.loginForm.invalid) return;
    this.adminService.loginAdmin({email:this.fc['email'].value, password:this.fc['password'].value}).subscribe((d)=>{
      this.router.navigateByUrl('/admin/home')
    })
    
  }

}
