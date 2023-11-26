import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../../service/patient.service';

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
  ){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name:['',[Validators.required,Validators.min(4)]],
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.pattern,Validators.min(6)]],
      address:["",[Validators.required,Validators.min(4)]]
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
    this.patientService.patientRegister({name:this.fc['name'].value,email:this.fc['email'].value, password:this.fc['password'].value, address:this.fc['address'].value }).subscribe((data)=>{
      console.log("success login");
    })
  }


}
