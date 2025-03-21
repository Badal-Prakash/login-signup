import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean = false;
  constructor(
    public formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private tostr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.service.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }
  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return (
      Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched))
    );
  }
  onSubmit() {
    this.isSubmitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      this.service.loginUser(this.form.value).subscribe({
        next: (res: any) => {
          this.service.saveToken(res.token);
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          if (err.status == 400) {
            this.tostr.error('Incorrect Email or Password', 'Login Failed');
          } else {
            console.log('error during login\n', err);
          }
        },
      });
    }
  }
}
