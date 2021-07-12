import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  loggedIn: Boolean = false;
  numOfItems: number = 0;

  constructor(
    private authService: AuthGuardService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.loggedInSubject.subscribe(
      (data) => (this.loggedIn = data)
    );
    this.cartService.itemsSubject.subscribe(
      (items) => (this.numOfItems = items.length)
    );
  }

  logout() {
    this.authService.logout();
  }
}
