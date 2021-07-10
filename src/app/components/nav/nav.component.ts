import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  loggedIn: Boolean = false;

  constructor(private authService: AuthGuardService) {}

  ngOnInit(): void {
    this.authService.loggedInSubject.subscribe(
      (data) => (this.loggedIn = data)
    );
  }

  logout() {
    this.authService.logout();
  }
}
