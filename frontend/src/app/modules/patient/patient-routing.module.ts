import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [{path:'',component:PatientComponent, children:[
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
