import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IListDoctors } from '../../../shared/interface/IListDoctors';
import { AdminService } from '../../../service/admin.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUpdateDoctor } from '../../../shared/interface/IUpdateDoctor';

@Component({
  selector: 'app-update-doctors',
  templateUrl: './update-doctors.component.html',
  styleUrls: ['./update-doctors.component.css']
})
export class UpdateDoctorsComponent implements OnInit {
  isSubmitted:boolean = false;
  doctorId!:string
//  doctorData!:FormGroup;
  LIST_DOCTOR_UPDATE!:IUpdateDoctor;
  UPDATE_FORM!:FormGroup;

  constructor(private router : Router,
    private activateRoute: ActivatedRoute,
    private adminService: AdminService, 
    private fb:FormBuilder,
    ){
      this.doctorId = this.activateRoute.snapshot.paramMap.get('id') ?? ''
  }

ngOnInit(): void {
  this.fetchDoctorData(this.doctorId)
  this.UPDATE_FORM = this.fb.group({
    name:['',[Validators.required,Validators.minLength(4)]],
    address:['',[Validators.required,Validators.minLength(4)]],
    email:['',[Validators.required,Validators.email]],
    phone:['',[Validators.required,Validators.minLength(10),Validators.pattern("^[0-9]*$")]] 
  })
}
get fc(){
 return this.UPDATE_FORM.controls
}

update(){
  this.isSubmitted=true
   if(this.UPDATE_FORM.invalid)return; 
   this.adminService.updateData({name:this.fc['name'].value, email:this.fc['email'].value, phone:this.fc['phone'].value, address:this.fc['address'].value},this.doctorId). subscribe(()=>{

   })

}

 private fetchDoctorData(id:string):void{
  this.adminService.fetchDoctor(id).subscribe((data)=>{
    this.LIST_DOCTOR_UPDATE = data.data as IUpdateDoctor 
    if(this.LIST_DOCTOR_UPDATE){
      this.UPDATE_FORM.patchValue({
        name:this.LIST_DOCTOR_UPDATE.name,
        email:this.LIST_DOCTOR_UPDATE.email,
        phone:this.LIST_DOCTOR_UPDATE.phone,
        address:this.LIST_DOCTOR_UPDATE.address
      })
    }
  })
 }

 

}
