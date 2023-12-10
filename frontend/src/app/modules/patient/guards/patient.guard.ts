import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PatientGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('PATIENT_KEY');
    if (token) {
      return true;
    } else {
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}