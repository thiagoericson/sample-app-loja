import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticateService } from '../../shared/services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private router: Router, private authenticateService: AuthenticateService) { }

  canActivate() {

    if (this.isLoggedIn()) {
        return true;
    }

    this.router.navigate(['/login']);

    return false;
  }

  private isLoggedIn() {
    const currentDate = new Date();

    if (this.getExpiration() > currentDate.getTime().toString()) {
      return true;
    }
    return false;
  }

  private getExpiration() {
    return localStorage.getItem('expires_at');
  }
}
