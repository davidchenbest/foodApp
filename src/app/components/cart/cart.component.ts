import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: any = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const cart = this.cartService.itemsSubject.subscribe((items) => {
      this.items = items;
    });
  }

  remove(index: number) {
    this.cartService.remove(index);
  }
}
