import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { FirstKeyPipe } from '../../shared/pipe/first-key.pipe';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registeration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FirstKeyPipe, RouterLink],
  templateUrl: './registeration.component.html',
  styles: ``,
})
export class RegisterationComponent implements OnInit {
  isSubmitted: boolean = false;
  form: FormGroup;
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }

    return null;
  };
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private tostr: ToastrService,
    private router: Router
  ) {
    this.form = this.formBuilder.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/(?=.*[^a-zA-Z0-9])/),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }
  ngOnInit(): void {
    if (this.service.isLoggedIn()) {
      // this.router.navigateByUrl('/dashboard');
    }
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.service.createUser(this.form.value).subscribe({
        next: (res: any) => {
          if (res.succeeded) {
            this.form.reset();
            this.isSubmitted = false;
            this.tostr.success('New User Created!', 'Registeration successful');
          } else {
          }
          console.log(res);
        },
        error: (err) => {
          if (err.error.errors) {
            err.error.errors.forEach((x: any) => {
              switch (x.code) {
                case 'DuplicateUserName':
                case 'DuplicateEmail':
                  this.tostr.error(
                    'Email already registered',
                    'Registeration Failed'
                  );
                  break;
                default:
                  this.tostr.error(
                    'Something went wrong',
                    'Please try again later'
                  );
              }
            });
          }
          console.log('err', err);
        },
      });
      console.log(this.form.value);
    }
  }
  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return (
      Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched))
    );
  }
}
