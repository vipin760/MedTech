import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ListPatientsComponent } from './components/pages/list-patients/list-patients.component';
import { UpdatePatientsComponent } from './components/pages/update-patients/update-patients.component';

const routes: Routes = [{path:'', component:DoctorComponent, children:[
  {path:'home',component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'list-patients', component:ListPatientsComponent},
  {path:'update-patients/:id', component:UpdatePatientsComponent},
  {path:'', redirectTo:"/doctor/login", pathMatch:"full"}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
