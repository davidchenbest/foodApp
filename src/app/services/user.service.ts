import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../components/interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:3000/users');
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`http://localhost:3000/users/${id}`);
  }

  registerUser(user: User): Observable<User> {
    return this.httpClient.post<User>('http://localhost:3000/users', user);
  }

  updateUser(id: number, user: any): Observable<User> {
    return this.httpClient.put<User>(`http://localhost:3000/users/${id}`, user);
  }
}
