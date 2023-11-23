import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'',component:AppComponent, loadChildren:()=> import('../app/modules/patient/patient.module').then(com=> com.PatientModule)},
  {path:'admin',component:AppComponent, loadChildren:() => import('../app/modules/admin/admin.module').then(com=> com.AdminModule)},
  {path:'doctor', component:AppComponent, loadChildren:()=> import('../app/modules/doctor/doctor.module').then(com => com.DoctorModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
