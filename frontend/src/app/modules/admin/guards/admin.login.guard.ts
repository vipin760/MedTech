import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('Admin');
    if (token) {
        this.router.navigateByUrl('/admin/home');
      return false;
    } else {
      return true;
    }
  }
}