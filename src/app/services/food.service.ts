import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Food } from '../components/interfaces/Food';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  searchSubject = new Subject<string>();
  constructor(private httpClient: HttpClient) {}

  getFoods(): Observable<Food[]> {
    return this.httpClient.get<Food[]>('http://localhost:3000/foods');
  }

  getFood(id: number): Observable<Food> {
    return this.httpClient.get<Food>(`http://localhost:3000/foods/${id}`);
  }
}
