import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientsNavbarComponent } from './components/partials/patients/patients-navbar/patients-navbar.component';
import { PatientsLoginComponent } from './components/pages/patients-login/patients-login.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientsNavbarComponent,
    PatientsLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
