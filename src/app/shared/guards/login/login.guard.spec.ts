import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginGuard } from './login.guard';
import { AuthService } from '../../services/auth.service';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, LoginGuard],
    });
    guard = TestBed.inject(LoginGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user is authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const result = guard.canActivate(route, state);

    expect(result).toBe(true);
  });

  it('should deny access and redirect to login when user is not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    spyOn(authService, 'routeToLogin');

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const result = guard.canActivate(route, state);

    expect(authService.routeToLogin).toHaveBeenCalled();
    expect(result).toBe(false);
  });
});
