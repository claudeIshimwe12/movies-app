import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import * as AuthActions from "../../store/auth/auth.actions";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  error$!: Observable<string>;
  public submitted = false;
  constructor(
    private authService: AuthService,
    private store: Store,
  ) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.error$ = this.authService.getErrorMessage();
  }

  submitLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.submitted = false;
      const data: User = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.authService.logIn(data.email, data.password);
    }
  }
}
