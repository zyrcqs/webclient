// Angular
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
// Services
import { UsersService } from './users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.usersService.getUserKey()) {
      if (state.url === '/signin') {
        this.router.navigateByUrl('/mail');
      }
      return true;
    } else if (state.url === '/signin') {
      return true;
    } else {
      if (state.url.indexOf('/mail/') > -1) {
        localStorage.setItem('nextPage', state.url);
      }
      this.router.navigateByUrl('/signin');
      return false;
    }
  }
}
