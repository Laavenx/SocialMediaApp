import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registerMode = false;
  users: any;
  model: any = {}
  validationErrors?: string[];

  constructor(public accountService: AccountService, private router: Router,
     private authService: SocialAuthService) { }

  ngOnInit(): void {
  }

  loginGoogle() {
    this.authService.authState.subscribe((user) => {
      console.log(user,"ser");
    })
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.model = {};
      },
      error: (err) => {
        this.validationErrors = err;
      }
    });
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

  isArray(obj : any ) {
    return Array.isArray(obj)
 }
}
