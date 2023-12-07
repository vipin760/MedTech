import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { InputValidatorComponent } from './components/partials/input-validator/input-validator.component';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { AppTitleComponent } from './components/partials/app-title/app-title.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PatientModule } from '../patient/patient.module';
import { MatCardModule } from '@angular/material/card';
import { AddDoctorComponent } from './components/pages/add-doctor/add-doctor.component';
import { ListDoctorsComponent } from './components/pages/list-doctors/list-doctors.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UpdateDoctorsComponent } from './components/pages/update-doctors/update-doctors.component';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ListPatientsComponent } from './components/pages/list-patients/list-patients.component';
import { UpdatePatientsComponent } from './components/pages/update-patients/update-patients.component';


@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    InputValidatorComponent,
    InputContainerComponent,
    TextInputComponent,
    DefaultButtonComponent,
    AppTitleComponent,
    AddDoctorComponent,
    ListDoctorsComponent,
    UpdateDoctorsComponent,
    ListPatientsComponent,
    UpdatePatientsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    PatientModule,
    MatTableModule,
     MatPaginatorModule,
     MatSortModule,
     MatFormFieldModule, 
     MatSelectModule,
     MatInputModule,
     FormsModule
  ]
})
export class AdminModule { }
