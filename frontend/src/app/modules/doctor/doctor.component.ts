import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {
  collapsed = signal(false)
  sideNavWidth = computed(()=> this.collapsed()? '65px' : '250px');

}
