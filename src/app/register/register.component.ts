import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hidePassword = true;
  registerRequestError = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onRegister() {
    this.authService
      .register({ email: this.email?.value, password: this.password?.value })
      .subscribe({
        next: () => {
          this.authService
            .login({
              email: this.email?.value,
              password: this.password?.value,
            })
            .subscribe({
              next: (userToken) => {
                localStorage.setItem('userToken', JSON.stringify(userToken));
                this.router.navigate(['play']);
              },
              error: (error) => console.error(error),
            });
        },
        error: (error) => {
          console.error(error);
          this.registerRequestError = error.error.message;
        },
      });
  }
}
