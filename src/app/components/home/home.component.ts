import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FoodService } from 'src/app/services/food.service';
import { Food } from '../interfaces/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  get fc() {
    return this.searchForm.controls;
  }

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.foodService.getFoods().subscribe((f) => {
      this.foods = f;
    });
  }

  onSubmit() {
    console.log(this.searchForm.value);
  }
}
