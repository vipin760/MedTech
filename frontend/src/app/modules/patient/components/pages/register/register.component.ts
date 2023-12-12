import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../../service/patient.service';
import { Router } from '@angular/router';
import { PasswordMatchValidator } from '../../../shared/validators/passwordMatchValidators';
import { PasswordValidatorStrong } from '../../../shared/validators/passwordstrong';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!:FormGroup;
  isSubmitted:boolean=false;

  constructor (
    private fb : FormBuilder,
    private patientService:PatientService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name:['',[Validators.required,Validators.min(4)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern,Validators.min(6),PasswordValidatorStrong.strong]],
      confirmPassword:['',[Validators.required]],
      phone:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^[0-9]*$")]]
    },{
      validator: PasswordMatchValidator('password','confirmPassword')
    })
  }

  get fc(){
    return this.registerForm.controls
  }

  submit(){
    this.isSubmitted =true;
    if(this.registerForm.invalid) {
     console.log(this.registerForm);
      return
    }
    this.patientService.patientRegister({name:this.fc['name'].value,email:this.fc['email'].value, password:this.fc['password'].value, phone:this.fc['phone'].value }).subscribe((data)=>{
      this.router.navigateByUrl('/login')
    })
  }


}
