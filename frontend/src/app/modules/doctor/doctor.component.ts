import { Component, computed, signal } from '@angular/core';
import { DoctorService } from './service/doctor.service';
import { Doctor } from './shared/model/Doctor.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {

  doctor!:Doctor;

  constructor(
    private doctorService :DoctorService
  ){
     doctorService.doctorObservable.subscribe(newDoctor=>{
      this.doctor = newDoctor
      console.log(this.doctor)
    })
  }
//////////////////////////////////////////////////////////////////////
  collapsed = signal(false)
  sideNavWidth = computed(()=> this.collapsed()? '65px' : '250px');
//////////////////////////////////////////////////////////////////////

}
