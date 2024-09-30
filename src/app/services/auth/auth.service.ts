import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
// import { User } from "../../models/user.interface";
// import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: unknown;
  errorMessage = new BehaviorSubject<string>('');
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router,
    private fireAuth: AngularFireAuth,
  ) {
    this.fireAuth.authState.subscribe((user) => {
      if (isPlatformBrowser(this.platformId)) {
        if (user) {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user));
          JSON.parse(localStorage.getItem('user')!);
        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      }
    });
  }

  logIn(email: string, password: string) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.fireAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        this.errorMessage.next(error.message);
      });
  }
  register(email: string, password: string) {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.fireAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['login']);
          }
        });
      })
      .catch((error) => {
        if (
          error.message.includes(
            'The email address is already in use by another account',
          )
        ) {
          this.errorMessage.next('Email Already Registered 😊');
        } else {
          this.errorMessage.next('Something Went Wrong😒');
        }
      });
  }
  logout() {
    this.fireAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      })
      .catch(() => {
        throw new Error('Failed to Sign Out');
      });
  }
  getErrorMessage() {
    return this.errorMessage.asObservable();
  }
}
