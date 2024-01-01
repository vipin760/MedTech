import { Component, Input, computed, signal } from '@angular/core';
import { AdminService } from '../../../service/admin.service'
import { AdminLogin } from '../../../shared/model/Admin.model';
import { MenuItem } from '../../../shared/interface/IAdmin';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 admin!:AdminLogin;
  constructor(private adminService :AdminService){
    this.adminService.adminObservable.subscribe(newAdmin=>{
      this.admin = newAdmin
    })
  }

  logout(){
    this.adminService.logout()
  }
  ////////////////////////////////////////////////////////////////
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val:boolean){
    this.sideNavCollapsed.set(val)
  }

  menuItems = signal<MenuItem[]>([
    {
      icon:'home',
      label:'home',
      route:'home'
    },
    {
      icon:' local_library',
      label:'about',
      route:'about'
    },
    {
      icon:'local_laundry_service',
      label:'service',
      route:'service'
    }
  ])
  profilePicSize = computed(()=> this.sideNavCollapsed()? '32' : '100')
  ////////////////////////////////////////////////////////////////  


}
