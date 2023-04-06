import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenModel } from 'src/app/feature/login/models/token.model';

@Injectable()
export class AuthService {
  constructor(private router: Router) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('Token');
    const status = localStorage.getItem('Status') 
    if (token &&  status === "1") {
      return true;
    } else {
      return false;
    }
  }

  public getToken(): TokenModel {
    
    const token = {
      Status: Number(localStorage.getItem('Status')),
      Token: localStorage.getItem('Token') || ''
    }

    return token;
  }

  public setToken(token: TokenModel): void {
    localStorage.setItem('Token', token.Token);
    localStorage.setItem('Status', token.Status.toString());
  }

  public removeToken(): void {
    localStorage.removeItem('Token');
    localStorage.removeItem('Status');
  }

  public routeToLogin(): void {
    this.router.navigate(['/login']);
  }
}
