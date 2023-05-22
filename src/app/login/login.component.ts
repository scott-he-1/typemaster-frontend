import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequestError = '';
  loading = false;
  success = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    this.loading = true;
    const formValue = this.loginForm.value;

    try {
      this.authService
        .login(formValue)
        .pipe(
          catchError((error) => {
            this.loginRequestError = error.error.message;
            return throwError(error);
          })
        )
        .subscribe((userToken) => {
          localStorage.setItem('userToken', JSON.stringify(userToken));
          this.success = true;
          this.router.navigate(['play']);
        });
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  }
}
