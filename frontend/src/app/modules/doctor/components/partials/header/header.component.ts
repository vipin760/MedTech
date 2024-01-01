import { Component, Input, computed, signal } from '@angular/core';
import { DoctorService } from '../../../service/doctor.service';
import { Doctor } from '../../../shared/model/Doctor.model';
import { MenuItem } from '../../../shared/interface.ts/Doctor.interface';


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
//////////////////////////////////////////////////////////////////////
sideNavCollapsed = signal(false);
  @Input() set collapsed(val:boolean){
    this.sideNavCollapsed.set(val)
  }

  menuItems = signal<MenuItem[]>([
    {
      icon:'home',
      label:'home',
      route:'/doctor/home'
    },
    {
      icon:' local_library',
      label:'Patients',
      route:'/doctor/list-patients'
    },
    {
      icon:'local_laundry_service',
      label:'Appointments',
      route:'/doctor/add-slot'
    }
  ])
  profilePicSize = computed(()=> this.sideNavCollapsed()? '32' : '100')
  ///////////////////////////////////////////////////////////////////////
}
