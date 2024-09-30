import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  loginForm!: FormGroup;
  public submitted = false;
  confirmPassword = false;
  error$!: Observable<string>;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.error$ = this.authService.getErrorMessage();
  }

  submitLogin() {
    this.confirmPassword = false;
    if (
      this.loginForm.value.password !== this.loginForm.value.confirmPassword
    ) {
      this.confirmPassword = true;
      return;
    }
    this.submitted = true;
    if (this.loginForm.valid) {
      this.submitted = false;
      this.authService.register(
        this.loginForm.value.email,
        this.loginForm.value.password,
      );
    }
  }
}
