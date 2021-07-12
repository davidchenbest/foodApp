import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Food } from '../components/interfaces/Food';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  itemsSubject = new BehaviorSubject<any>([]);
  totalSubject = new BehaviorSubject<number>(0);
  constructor() {}

  add(item: Food) {
    const items = this.itemsSubject.value;
    items.push(item);
    this.itemsSubject.next(items);
    this.addToTotal(item);
  }

  set(items: Food[]) {
    this.itemsSubject.next(items);
    this.setTotal(items);
  }

  remove(index: number) {
    const items = this.itemsSubject.value;
    items.splice(index, 1);
    this.itemsSubject.next(items);
    this.setTotal(items);
  }

  addToTotal(item: Food) {
    let total = this.totalSubject.value;
    total += item.qty * item.price;
    this.totalSubject.next(total);
  }
  setTotal(items: Food[]) {
    let total = 0;
    items.forEach((item) => (total += item.qty * item.price));
    this.totalSubject.next(total);
  }
}
