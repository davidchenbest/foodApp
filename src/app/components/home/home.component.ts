import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router
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
}
