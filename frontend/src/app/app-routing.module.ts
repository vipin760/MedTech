import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsLoginComponent } from './components/pages/patients-login/patients-login.component';

const routes: Routes = [
  {path:'login', component:PatientsLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
