import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { InputValidatorComponent } from './components/partials/input-validator/input-validator.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppTitleComponent } from './components/partials/app-title/app-title.component';
import { RegisterComponent } from './components/pages/register/register.component';


@NgModule({
  declarations: [
    PatientComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    InputContainerComponent,
    DefaultButtonComponent,
    InputValidatorComponent,
    TextInputComponent,
    AppTitleComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    InputContainerComponent,
    DefaultButtonComponent,
    InputValidatorComponent,
    TextInputComponent,
    AppTitleComponent
  ]
})
export class PatientModule { }
