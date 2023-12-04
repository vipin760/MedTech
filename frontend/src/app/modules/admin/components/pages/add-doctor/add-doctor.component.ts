import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/modules/doctor/service/doctor.service';
import { AdminService } from '../../../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit{
  addDoctor!:FormGroup;
  isSubmitted:boolean=false;

  selectedGender:any=[
    {label:'Male', value:'Male'},
    {label:'Female', value:'Female'},
    {label:'Other', value:'Other'}
  ]


  constructor(
    private fb:FormBuilder,
    private adminService:AdminService,
    private router: Router
  ){}

ngOnInit(): void {
  this.addDoctor = this.fb.group({
    name:['',[Validators.required,Validators.minLength(4)]],
    email:['',[Validators.required]],
    phone:['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10)]],
    address:['',[Validators.required,Validators.minLength(5)]],
    password:['',[Validators.required,Validators.minLength(6)]],
    gender:['',Validators.required]
  })
}

get fc(){
 return this.addDoctor.controls
}

submit(){
  const pattern = /[0-9\+\-\ ]/;
  this.isSubmitted = true;
  if(this.addDoctor.invalid) return
  
  this.adminService.addDoctor({name:this.fc['name'].value, email:this.fc['email'].value,phone:this.fc['phone'].value, address:this.fc['address'].value, password:this.fc['password'].value, gender:this.fc['gender'].value}).subscribe(()=>{
    // this.router.navigateByUrl("/add-doctor")
  })

}
}




    // dateofbirth:['',[Validators.required]],
    // gender:['',Validators.required],