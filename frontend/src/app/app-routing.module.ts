import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsLoginComponent } from './components/pages/patients-login/patients-login.component';
import { PatientsRegisterComponent } from './components/pages/patients-register/patients-register.component';

const routes: Routes = [
  {path:'login', component:PatientsLoginComponent},
  {path:'register', component:PatientsRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
