import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegiser = new EventEmitter();
  model: any = {};
  registerForm: FormGroup = new FormGroup({});

  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  date(c: AbstractControl): { [key: string]: boolean } {
    let value = new Date(c.value);
    return isNaN(value.getTime()) || value <= new Date('01/01/1900') || value >= new Date('01/01/2015') ? {'dateInvalid': true} : undefined;
 }

  initializeForm(){
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
    console.log(this.registerForm?.value);
    console.log("------------")
    console.log(this.registerForm.get('username').errors)
    console.log(this.registerForm.get('username').touched)
/*     this.accountService.register(this.model).subscribe({
      next: (res) => {
        console.log(res);
        this.cancel();
      },
      error: (err) => { 
        console.log(err);
        this.toastr.error(err.error);
       }
    }); */
  }

  cancel() {
    this.cancelRegiser.emit(false);
  }

}
