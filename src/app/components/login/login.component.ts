import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthGuardService) {}

  ngOnInit(): void {}

  get fc() {
    return this.loginForm.controls;
  }

  onSubmit(): any {
    const { username, password } = this.loginForm.value;
    this.authService.login(this.loginForm.value);
  }
}
