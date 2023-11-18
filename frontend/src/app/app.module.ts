import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientsNavbarComponent } from './components/partials/patients/patients-navbar/patients-navbar.component';
import { PatientsLoginComponent } from './components/pages/patients-login/patients-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidatorsComponent } from './components/partials/input-validators/input-validators.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { TitleComponent } from './components/partials/title/title.component'
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card'
import { MatTabsModule} from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
    PatientsNavbarComponent,
    PatientsLoginComponent,
    InputContainerComponent, 
    InputValidatorsComponent,
    TextInputComponent,
    DefaultButtonComponent,
    TitleComponent,
  ],
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
      timeOut:3000,
      positionClass:'toast-top-right',
      newestOnTop:false
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
