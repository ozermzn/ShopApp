import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable, timeInterval } from 'rxjs';
import { AuthResponse } from '../auth.response';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  loading: boolean = true;
  error: string = '';
  model: any = {};
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => (this.loading = false), 300);
  }

  //Log button for register or login swip
  log() {
    if (this.isLogin == true) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
    console.log(this.isLogin);
  }
  handleAuth(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.loading = true;
    const email = form.value.email;
    const password = form.value.password;
    let authResponse: Observable<AuthResponse>;
    if (this.isLogin) {
      authResponse = this.authService.login(email, password);
    } else {
      authResponse = this.authService.register(email, password);
    }
    authResponse.subscribe({
      next: (response) => {
        console.log(response);
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err;
      },
    });
  }
}
