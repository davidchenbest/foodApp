import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from '../interfaces/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchId!: number;
  searchParam!: string;
  foods: Food[] = [];
  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  get fc() {
    return this.searchForm.controls;
  }

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const searchParam = this.route.snapshot.paramMap.get('searchParam');
    this.searchParam = searchParam ? searchParam : '';
    this.getData();

    this.foodService.searchSubject.subscribe((search) => {
      this.searchParam = search;
      this.getData();
    });
  }

  getData() {
    this.foodService.getFoods().subscribe((foods) => {
      if (this.searchParam) {
        this.foods = foods.filter((f) =>
          f.name.toLowerCase().includes(this.searchParam.toLowerCase())
        );
      } else this.foods = foods;
      this.modifyFoodsInCart();
    });
  }

  onSubmit() {
    const { search } = this.searchForm.value;
    this.foodService.searchSubject.next(search);
    this.router.navigate(['/home', search]);
  }

  removeSearch() {
    this.foodService.searchSubject.next();
    this.router.navigate(['/home']);
  }

  modifyFoodsInCart() {
    const itemsInCart = this.cartService.itemsSubject.value;
    itemsInCart.forEach((item: Food) => {
      const id = item.id;
      const index = this.foods.findIndex((food: Food) => food.id == id);
      this.foods[index].inCart = true;
      this.foods[index].qty = item.qty;
    });
  }

  addItemToCart(index: number, step?: number) {
    this.foods[index].inCart = true;
    const { id } = this.foods[index];
    const itemsInCart = this.cartService.itemsSubject.value;
    const indexInCart = itemsInCart.findIndex((item: any) => item.id == id);

    if (indexInCart < 0) {
      this.foods[index].qty = 1;
      // https://stackoverflow.com/questions/61099749/rxjs-behavior-subject-value-changes-without-calling-next
      this.cartService.set([...itemsInCart, { ...this.foods[index] }]);
    } else {
      this.foods[index].qty = itemsInCart[indexInCart].qty + (step ? step : 1);
      itemsInCart[indexInCart].qty += step ? step : 1;

      if (itemsInCart[indexInCart].qty <= 0) {
        itemsInCart.splice(indexInCart, 1);
        this.foods[index].inCart = false;
      }
      this.cartService.set(itemsInCart);
    }
  }
}
