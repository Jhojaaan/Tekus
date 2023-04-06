import { TestBed } from '@angular/core/testing';

import { LoginViewModel } from './login-view-model';
import { LoginService } from '../services/login.service';
import { MessageService } from 'primeng/api';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TokenModel } from '../models/token.model';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

const token: TokenModel = {
  Status: 1,
  Token: 'token',
};

describe('UserViewModelService', () => {
  let service: LoginViewModel;
  let loginService: LoginService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [LoginViewModel, LoginService, MessageService],
    });
    service = TestBed.inject(LoginViewModel);
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  it('UserViewModelService - should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loginUser - should call loginUser and save tokens', () => {
    spyOn(router, 'navigate');
    spyOn(loginService, 'login').and.returnValue(of(token));
    spyOn(localStorage, 'setItem');
    service.loginUser({ UserName: 'test', Password: 'test' });
    expect(loginService.login).toHaveBeenCalledWith({
      UserName: 'test',
      Password: 'test',
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('Token', token.Token);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'Status',
      token.Status.toString()
    );
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('loginUser - should call loginUser and return error', () => {
    const errorMessage = 'Invalid username or password';
    const errorResponse = { error: errorMessage };
    spyOn(loginService, 'login').and.returnValue(
      throwError(() => errorResponse)
    );
    spyOn(localStorage, 'setItem');
    service.loginUser({ UserName: 'test', Password: 'test' });
    expect(loginService.login).toHaveBeenCalledWith({
      UserName: 'test',
      Password: 'test',
    });
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
