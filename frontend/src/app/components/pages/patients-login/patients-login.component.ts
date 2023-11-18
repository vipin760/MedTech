import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patients-login',
  templateUrl: './patients-login.component.html',
  styleUrls: ['./patients-login.component.css'],
})
export class PatientsLoginComponent implements OnInit {
  hide:boolean=true;
  height:string='auto'
  width:string='90%'
  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  returnUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private patientService: PatientsService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.returnUrl = this.activateRoute.snapshot.queryParams['returnUrl'];
  }

  get fc() {
    return this.loginForm.controls;
  }

  submit() {
    console.log('working');
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;
    this.patientService
      .loginPatients({
        email: this.fc['email'].value,
        password: this.fc['password'].value,
      })
      .subscribe((data) => {
        this.router.navigateByUrl(this.returnUrl);
      });
  }
}
