import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Food } from '../components/interfaces/Food';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  itemsSubject = new BehaviorSubject<any>([]);
  constructor() {}

  add(item: Food) {
    const items = this.itemsSubject.value;
    items.push(item);
    this.itemsSubject.next(items);
  }

  set(items: Food[]) {
    this.itemsSubject.next(items);
  }

  remove(index: number) {
    const items = this.itemsSubject.value;
    items.splice(index, 1);
    this.itemsSubject.next(items);
  }
}
