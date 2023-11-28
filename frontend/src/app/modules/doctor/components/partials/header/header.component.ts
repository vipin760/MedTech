import { Component } from '@angular/core';
import { DoctorService } from '../../../service/doctor.service';
import { Doctor } from '../../../shared/model/Doctor.model';

@Component({
  selector: 'app-doctor-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
doctor!:Doctor;
constructor(private doctorService:DoctorService){
 this.doctorService.doctorObservable.subscribe(newDoctor=>{
  this.doctor = newDoctor
 })
}
///////////////////////////////////////////////////////////////////////

logout(){
  this.doctorService.logoutDoctor()
}
///////////////////////////////////////////////////////////////////////
}
