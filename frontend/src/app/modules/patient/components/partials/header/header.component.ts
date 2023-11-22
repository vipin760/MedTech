import { Component } from '@angular/core';
import { PatientLogin } from '../../../shared/model/Patient.Login.model';
import { PatientService } from '../../../service/patient.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  patients!:PatientLogin
 constructor(private patientService: PatientService){
 patientService.PatientObservable.subscribe(newPatient=>{
    this.patients = newPatient
  })
 }

////////////////////////////////////////////////////////////////////
logout(){
  console.log("working");
  
  this.patientService.logout()
}

}
