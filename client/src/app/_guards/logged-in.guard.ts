import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): any {
    if (localStorage.getItem('user') !== null) {
      this.router.navigateByUrl('/');
    }
  }

}
