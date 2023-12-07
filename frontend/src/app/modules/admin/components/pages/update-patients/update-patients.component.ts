import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../service/admin.service';
import { IListPatient } from '../../../shared/interface/IListPatients';

@Component({
  selector: 'app-update-patients',
  templateUrl: './update-patients.component.html',
  styleUrls: ['./update-patients.component.css']
})
export class UpdatePatientsComponent implements OnInit{
  isSubmitted:boolean=false
  patientId!:string
  UPDATE_FORM!:FormGroup
  LIST_DOCTOR_UPDATE!:IListPatient;

  constructor(
    private activateRoute: ActivatedRoute,
    private adminService: AdminService,
    private fb: FormBuilder,
    private router : Router
  ){
    this.patientId = this.activateRoute.snapshot.paramMap.get('id') ?? ''
  }

  ngOnInit(): void {
    this.fetchPatientData(this.patientId)
    this.UPDATE_FORM = this.fb.group({
      name:['',[Validators.required,Validators.minLength(4)]],
      address:['',[Validators.required,Validators.minLength(4)]],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required,Validators.minLength(10),Validators.pattern("^[0-9]*$")]] 
    })
    
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
get fc(){
 return this.UPDATE_FORM.controls
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

update(){
  this.isSubmitted = true
  if(this.UPDATE_FORM.invalid) return;
this.adminService.udatePatient({name:this.fc['name'].value, email:this.fc['email'].value,address:this.fc['address'].value, phone:this.fc['phone'].value },this.patientId).subscribe(()=>{
  this.router.navigateByUrl('admin/list-patients')
})

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  fetchPatientData(id:string){
    this.adminService.fetchPatient(id).subscribe(data=>{
      this.LIST_DOCTOR_UPDATE = data.data
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
 