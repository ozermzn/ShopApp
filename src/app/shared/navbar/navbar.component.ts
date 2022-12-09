import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  hide: boolean = false;
  isAuth: boolean = false;
  isOut: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.isAuth = !!user;
      this.isAdmin = user?.email == 'ozer.ramazan@outlook.com.tr';
    });
  }
  logout() {
    this.authService.logout();
  }
  drpDown() {
    this.hide = !this.hide;
  }
  drpDownAuth() {
    this.isOut = !this.isOut;
  }

  show(id: any) {
    id.classList.contains('hide')
      ? id.classList.remove('hide')
      : id.classList.add('hide');
  }
}
