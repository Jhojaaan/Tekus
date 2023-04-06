import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenModel } from 'src/app/feature/login/models/token.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: {
            navigate: () => {},
          },
        },
      ],
    });
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
  });

  it('AuthService - should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('isAuthenticated - should return true if token and status are set', () => {
    localStorage.setItem('Token', 'test-token');
    localStorage.setItem('Status', '1');
    expect(authService.isAuthenticated()).toBe(true);
  });

  it('isAuthenticated - should return false if token or status are not set', () => {
    localStorage.removeItem('Token');
    localStorage.setItem('Status', '1');
    expect(authService.isAuthenticated()).toBe(false);

    localStorage.setItem('Token', 'test-token');
    localStorage.removeItem('Status');
    expect(authService.isAuthenticated()).toBe(false);
  });

  it('getToken - should return the token', () => {
    const expectedToken: TokenModel = { Token: 'test-token', Status: 1 };
    localStorage.setItem('Token', 'test-token');
    localStorage.setItem('Status', '1');
    expect(authService.getToken()).toEqual(expectedToken);
  });

  it('getToken - should not return the token', () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('Status');
    const expectedToken: TokenModel = { Token: '', Status: 0 };
    expect(authService.getToken()).toEqual(expectedToken);
  });

  it('setToken - should set the token and status in local storage', () => {
    const token: TokenModel = { Token: 'test-token', Status: 1 };
    authService.setToken(token);
    expect(localStorage.getItem('Token')).toEqual('test-token');
    expect(localStorage.getItem('Status')).toEqual('1');
  });

  it('should remove the token and status from local storage', () => {
    localStorage.setItem('Token', 'test-token');
    localStorage.setItem('Status', '1');
    authService.removeToken();
    expect(localStorage.getItem('Token')).toBeNull();
    expect(localStorage.getItem('Status')).toBeNull();
  });

  it('should navigate to login page', () => {
    spyOn(router, 'navigate');
    authService.routeToLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
