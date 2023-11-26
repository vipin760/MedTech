import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/pages/register/register.component';

const routes: Routes = [{path:'',component:PatientComponent, children:[
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'register', component:RegisterComponent},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
