import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IListPatient } from '../../../shared/interface.ts/IListPatient';
import { PatientService } from 'src/app/modules/patient/service/patient.service';
import { DoctorService } from '../../../service/doctor.service';

@Component({
  selector: 'app-update-patients',
  templateUrl: './update-patients.component.html',
  styleUrls: ['./update-patients.component.css']
})
export class UpdatePatientsComponent implements OnInit{
  patinetId!:string;
  PatientData!:IListPatient;
///////////////////////////////////////////////////////////
  constructor(
    private activateRoute:ActivatedRoute,
    private doctorService:DoctorService,
  ){
 this.patinetId = this.activateRoute.snapshot.paramMap.get('id') ?? ''
  }
///////////////////////////////////////////////////////////
ngOnInit(): void {
  this.fetchPatients(this.patinetId)
}
///////////////////////////////////////////////////////////
fetchPatients(id:string){
  this.doctorService.fetchPatient(id).subscribe((data)=>{
    this.PatientData = data.data
    console.log("this.PatientData",this.PatientData)
  })
}
///////////////////////////////////////////////////////////
}
