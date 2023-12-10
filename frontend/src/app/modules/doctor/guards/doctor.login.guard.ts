import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class doctorLoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('Doctor');
    if (token) {
        this.router.navigateByUrl('/doctor/home');
      return false;
    } else {
      return true;
    }
  }
}
