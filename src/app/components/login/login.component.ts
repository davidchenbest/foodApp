import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = { username: '', password: '' };
  message!: string;
  constructor(private authService: AuthGuardService) {}

  ngOnInit(): void {}

  onSubmit(): any {
    const { username, password } = this.user;
    if (!username || !password) return (this.message = 'Incomplete');
    this.authService.login(this.user);
  }
}
