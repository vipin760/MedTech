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
    AppTitleComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
