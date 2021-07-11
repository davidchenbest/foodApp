import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
// http://www.shrestharohit.com.np/subject-behavioursubject-rxjs-angular/
import { BehaviorSubject } from 'rxjs';
import { User } from '../components/interfaces/User';
import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  loggedIn: boolean = false;
  loggedInSubject = new BehaviorSubject<Boolean>(false);

  constructor(private _router: Router, private userService: UserService) {
    this.loggedIn = localStorage.getItem('isLoggedIn') == 'true' ? true : false;
    this.loggedInSubject.next(this.loggedIn);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this.loggedIn) return true;
    this._router.navigate(['/login']);
  }

  login(user: User) {
    this.userService.getUsers().subscribe((data) => {
      const resultUser = data.find(
        (d) => d.username == user.username && d.password == user.password
      );

      if (resultUser) {
        this.loggedIn = true;
        this.loggedInSubject.next(this.loggedIn);
        localStorage.setItem('isLoggedIn', 'true');
        this._router.navigate(['/home']);
      } else {
        alert('Login Failed. Try Again');
      }
    });
  }

  logout() {
    this.loggedIn = false;
    this.loggedInSubject.next(this.loggedIn);
    localStorage.removeItem('isLoggedIn');
    this._router.navigate(['/login']);
  }
}
