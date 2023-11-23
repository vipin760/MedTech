import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';

const routes: Routes = [{path:'', component:DoctorComponent, children:[
  {path:'home',component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'', redirectTo:"/doctor/login", pathMatch:"full"}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
