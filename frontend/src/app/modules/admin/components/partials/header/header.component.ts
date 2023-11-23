import { Component } from '@angular/core';
import { AdminService } from '../../../service/admin.service'
import { AdminLogin } from '../../../shared/model/Admin.model';

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

}
