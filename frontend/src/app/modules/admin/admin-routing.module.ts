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

const routes: Routes = [{path:'',component:AdminComponent, children:[
  {path:'home', component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'add-doctor',component:AddDoctorComponent},
  {path:'list-doctor', component:ListDoctorsComponent},
  {path:'update-doctor', component:UpdateDoctorsComponent},
  {path:'update-doctor/:id', component:UpdateDoctorsComponent},
  {path:'list-patients', component:ListPatientsComponent },
  {path:'update-patient/:id', component:UpdatePatientsComponent},
  {path:'', redirectTo:'/admin/login', pathMatch:'full'},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
