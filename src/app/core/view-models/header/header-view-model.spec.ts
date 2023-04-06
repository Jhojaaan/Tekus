import { TestBed } from '@angular/core/testing';
import { HeaderViewModel } from './header-view-model';
import { AuthService } from 'src/app/shared/services/auth.service';

describe('HeaderViewModel', () => {
  let model: HeaderViewModel;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderViewModel, AuthService],
    });
    model = TestBed.inject(HeaderViewModel);
    authService = TestBed.inject(AuthService);
  });
  it('HeaderViewModel - should create an instance', () => {
    expect(model).toBeTruthy();
  });

  it('logOut - should call logOut and call authService functions', () => {
    spyOn(authService, 'removeToken');
    spyOn(authService, 'routeToLogin');
    model.logOut();
    expect(authService.removeToken).toHaveBeenCalled();
    expect(authService.routeToLogin).toHaveBeenCalled();
  });
});
