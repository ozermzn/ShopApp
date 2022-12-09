import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AuthResponse } from './auth.response';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiKey = 'AIzaSyDZQ1YDCUpA3EvinGcKxmktOja3j4Rm25s';

  user = new BehaviorSubject<User | null>(null);

  register(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.apiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        //Kontrol amaçlı tap kullanımı
        tap((data) => {
          this.handleUser(
            data.email,
            data.localId,
            data.idToken,
            data.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.apiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((data) => {
          this.handleUser(
            data.email,
            data.localId,
            data.idToken,
            data.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }

  autoLogin() {
    if (localStorage.getItem('user') == null) {
      return;
    }
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user.tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
  }

  private handleError(err: HttpErrorResponse) {
    let message = 'Bir hata oluştu.';
    if (err.error.error) {
      switch (err.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          message = 'Bu email adresi bulunamadı';
          break;
        case 'INVALID_PASSWORD':
          message = 'Geçersiz parola.';
          break;
        case 'USER_DISABLED':
          message = 'Hesabınız geçici bir süreliğine kapatıldı.';
          break;
        case 'EMAIL_EXISTS':
          message = 'Bu email adresi zaten kullanılıyor.';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
          message =
            'Çok fazla giriş denemesi yapıldı, lütfen birazdan tekrar deneyiniz.';
          break;
      }
    }
    return throwError(() => message);
  }
  private handleUser(
    email: string,
    localId: string,
    tokenId: string,
    expiresIn: string
  ) {
    const exprationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, tokenId, exprationDate);
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user);
  }
}
