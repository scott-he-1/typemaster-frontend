import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login({ email, password }: { email: string; password: string }) {
    return this.http.post<string>(`${environment.DATABASE_URL}/auth/login`, {
      email,
      password,
    });
  }

  register({ email, password }: { email: string; password: string }) {
    return this.http.post(`${environment.DATABASE_URL}/user`, {
      email,
      password,
    });
  }
}
