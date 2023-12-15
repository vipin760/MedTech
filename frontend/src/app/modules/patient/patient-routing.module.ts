import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ServiceComponent } from './components/pages/service/service.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ForgetPasswordComponent } from './components/pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';

const routes: Routes = [{path:'',component:PatientComponent, children:[
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'register', component:RegisterComponent},
  {path:'service', component:ServiceComponent},
  {path:'about', component:AboutComponent},
  {path:'contact', component:ContactComponent},
  {path:'forget-password',component:ForgetPasswordComponent},
  {path:'reset-password/:id', component:ResetPasswordComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
