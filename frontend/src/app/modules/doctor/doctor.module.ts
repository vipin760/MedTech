import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidatorComponent } from './components/partials/input-validator/input-validator.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { AppTitleComponent } from './components/partials/app-title/app-title.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PatientModule } from '../patient/patient.module';
import { ListPatientsComponent } from './components/pages/list-patients/list-patients.component';
import { UpdatePatientsComponent } from './components/pages/update-patients/update-patients.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './components/pages/forget-password/forget-password.component';
import { AddSlotComponent } from './components/pages/add-slot/add-slot.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    DoctorComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    InputContainerComponent,
    InputValidatorComponent,
    DefaultButtonComponent,
    AppTitleComponent,
    ListPatientsComponent,
    UpdatePatientsComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    AddSlotComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PatientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule ,
    MatSelectModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule
  ]
})
export class DoctorModule { }
