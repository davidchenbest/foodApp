import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Food } from '../interfaces/Food';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: any = [];
  total: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.itemsSubject.subscribe((items) => {
      this.items = items;
    });

    this.cartService.totalSubject.subscribe((total) => (this.total = total));
  }

  remove(index: number) {
    this.cartService.remove(index);
  }
}
