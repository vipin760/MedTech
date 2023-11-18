import { Component } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';
import { Patients } from 'src/app/shared/model/Patients.model';

@Component({
  selector: 'patients-navbar',
  templateUrl: './patients-navbar.component.html',
  styleUrls: ['./patients-navbar.component.css']
})
export class PatientsNavbarComponent {
  patient!:Patients;
  constructor(private patientService: PatientsService){
    patientService.PatientObservable.subscribe(newPatient=>{
      this.patient = newPatient
    })
  }
  logout(){
    this.patientService.logout()
  }

}
