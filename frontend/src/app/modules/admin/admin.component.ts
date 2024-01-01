import { Component, computed, signal } from '@angular/core';
import { AdminLogin } from './shared/model/Admin.model';
import { AdminService } from './service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  admin!:AdminLogin;
  constructor(private adminService :AdminService){
    this.adminService.adminObservable.subscribe(newAdmin=>{
      this.admin = newAdmin
    })
  }
  ////////////////////////////////////////////////////////////////
  logout(){
    this.adminService.logout()
  }
  ////////////////////////////////////////////////////////////////
  collapsed = signal(false)
  sideNavWidth = computed(()=> this.collapsed()? '65px' : '250px');

}
