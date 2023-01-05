import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegiser = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { notMatching: true }
    }
  }

  date(c: AbstractControl): { [key: string]: boolean } {
    let value = new Date(c.value);
    return isNaN(value.getTime()) || value <= new Date('01/01/1900') || value >= new Date('01/01/2015') ? { 'dateInvalid': true } : undefined;
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['', [Validators.required,]],
      knownAs: ['', [Validators.required,]],
      dateOfBirth: ['', [Validators.required, this.date]],
      city: ['', [Validators.required,]],
      country: ['', [Validators.required,]],
      username: ['', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(32)]],
      password: ['', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(32)]],
      confirmPassword: ['', [Validators.required,
      this.matchValues('password')]]
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  register() {
    if (!this.registerForm.valid) this.registerForm.markAllAsTouched();
    else {
      this.accountService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigateByUrl('/members')
        },
        error: (err) => {
          console.log(err);
          this.validationErrors = err;
        }
      });
    }
  }

  cancel() {
    this.cancelRegiser.emit(false);
  }

}
