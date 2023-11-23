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
    HttpClientModule 
  ]
})
export class DoctorModule { }
