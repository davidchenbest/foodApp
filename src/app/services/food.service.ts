import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../components/interfaces/Food';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private httpClient: HttpClient) {}

  getFoods(): Observable<Food[]> {
    return this.httpClient.get<Food[]>('http://localhost:3000/foods');
  }
}
