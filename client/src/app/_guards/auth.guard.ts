import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService) { }

  canActivate(): boolean {
    if (localStorage.getItem('user') !== null) return true;
    else {
      this.toastr.warning("You must sign-in to access this feature");
      this.router.navigateByUrl('/member/login');
    }
  }
}
