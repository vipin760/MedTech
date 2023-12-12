import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdminTokenInterceptorService } from './interceptor/admin.interceptor';
import { DoctorTokenInterceptorService } from './interceptor/doctor.interceptor';
import { PatientTokenInterceptorService } from './interceptor/patient.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      newestOnTop: false,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminTokenInterceptorService,
      multi: true,
    },{
      provide:HTTP_INTERCEPTORS,
      useClass:DoctorTokenInterceptorService,
      multi:true
    },{
      provide:HTTP_INTERCEPTORS,
      useClass:PatientTokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
