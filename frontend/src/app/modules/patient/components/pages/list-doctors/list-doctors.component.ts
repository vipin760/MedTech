import { Component, OnInit } from '@angular/core';
import { IAvailableDoctor } from '../../../shared/interface/IPatientRegister';
import { PatientService } from '../../../service/patient.service';

@Component({
  selector: 'app-list-doctors',
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.css']
})
export class ListDoctorsComponent implements OnInit{
 listDoctors!:IAvailableDoctor
  constructor(
    private patientService:PatientService
  ){}
 ngOnInit(): void {
   this.fetchAvailableDoctors()
 }
 fetchAvailableDoctors(){
  this.patientService.getAvailableDoctors().subscribe((data)=>{
    this.listDoctors = data
    console.log("this.listDoctors",this.listDoctors)
  })
 }
}
