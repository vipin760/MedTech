import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class doctorGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('Doctor');
    if (token) {
      return true;
    } else {
      this.router.navigateByUrl('/doctor/login');
      return false;
    }
  }
}
