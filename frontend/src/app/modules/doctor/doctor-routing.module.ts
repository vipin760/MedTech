import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ListPatientsComponent } from './components/pages/list-patients/list-patients.component';
import { UpdatePatientsComponent } from './components/pages/update-patients/update-patients.component';
import { doctorGuard } from './guards/doctor.guard';
import { doctorLoginGuard } from './guards/doctor.login.guard';
import { ForgetPasswordComponent } from './components/pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { AddSlotComponent } from './components/pages/add-slot/add-slot.component';

const routes: Routes = [{path:'', component:DoctorComponent, children:[
  {path:'home',canActivate:[doctorGuard],component:HomeComponent},
  {path:'login',canActivate:[doctorLoginGuard],component:LoginComponent},
  {path:'list-patients',canActivate:[doctorGuard], component:ListPatientsComponent},
  {path:'update-patients/:id',canActivate:[doctorGuard],component:UpdatePatientsComponent},
  {path:'add-slot',canActivate:[doctorGuard],component:AddSlotComponent},
  {path:'forget-password',component:ForgetPasswordComponent},
  {path:'reset-password/:id',component:ResetPasswordComponent},
  {path:'', redirectTo:"/doctor/login", pathMatch:"full"}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
 