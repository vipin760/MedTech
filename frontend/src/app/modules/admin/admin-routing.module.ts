import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AddDoctorComponent } from './components/pages/add-doctor/add-doctor.component';
import { ListDoctorsComponent } from './components/pages/list-doctors/list-doctors.component';
import { UpdateDoctorsComponent } from './components/pages/update-doctors/update-doctors.component';
import { ListPatientsComponent } from './components/pages/list-patients/list-patients.component';
import { UpdatePatientsComponent } from './components/pages/update-patients/update-patients.component';
import { adminGuard } from './guards/admin.guard';
import { AdminLoginGuard } from './guards/admin.login.guard';
import { ForgetPasswordComponent } from './components/pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';

const routes: Routes = [{path:'',component:AdminComponent, children:[
  {path:'home',canActivate:[adminGuard],component:HomeComponent},
  {path:'login',canActivate:[AdminLoginGuard],component:LoginComponent},
  {path:'add-doctor',canActivate:[adminGuard],component:AddDoctorComponent},
  {path:'list-doctor',canActivate:[adminGuard],component:ListDoctorsComponent},
  {path:'update-doctor',canActivate:[adminGuard],component:UpdateDoctorsComponent},
  {path:'update-doctor/:id',canActivate:[adminGuard],component:UpdateDoctorsComponent},
  {path:'list-patients',canActivate:[adminGuard],component:ListPatientsComponent },
  {path:'update-patient/:id',canActivate:[adminGuard],component:UpdatePatientsComponent},
  {path:'forget-password',component:ForgetPasswordComponent},
  {path:'reset-password/:id',component:ResetPasswordComponent},
  {path:'', redirectTo:'/admin/login', pathMatch:'full'},
]}]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
