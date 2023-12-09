import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IListPatient } from '../../../shared/interface.ts/IListPatient';
import { PatientService } from 'src/app/modules/patient/service/patient.service';
import { DoctorService } from '../../../service/doctor.service';

@Component({
  selector: 'app-update-patients',
  templateUrl: './update-patients.component.html',
  styleUrls: ['./update-patients.component.css']
})
export class UpdatePatientsComponent implements OnInit{
  patientId!:string;
  PatientData!:IListPatient;
///////////////////////////////////////////////////////////
  constructor(
    private activateRoute:ActivatedRoute,
    private doctorService:DoctorService,
    private router: Router
  ){
 this.patientId = this.activateRoute.snapshot.paramMap.get('id') ?? ''
  }
///////////////////////////////////////////////////////////
ngOnInit(): void {
  this.fetchPatients(this.patientId)
}
///////////////////////////////////////////////////////////
fetchPatients(id:string){
  this.doctorService.fetchPatient(id).subscribe((data)=>{
    console.log(data.data)
    this.PatientData = data.data
  })
}
///////////////////////////////////////////////////////////

}
