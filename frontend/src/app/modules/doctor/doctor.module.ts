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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PatientModule } from '../patient/patient.module';


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
    AppTitleComponent
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
    PatientModule
  ]
})
export class DoctorModule { }
