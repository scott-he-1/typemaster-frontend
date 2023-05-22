import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentToken: string | null = null;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      this.currentToken = userToken;
    }
  }

  logout() {
    localStorage.removeItem('userToken');
    this.currentToken = null;
    this.router.navigate(['login']);
  }
}
