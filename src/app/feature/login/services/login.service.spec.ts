import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { TokenModel } from '../models/token.model';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    service.login({ UserName: 'dsasdsad', Password: 'password' }).subscribe({
      next: (response: TokenModel) => {
        expect(response.Status).toBe(1);
        expect(response.Token).toBe('token');
      },
    });
    const req = httpMock.expectOne(`${environment.apiUrl}account/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      UserName: 'dsasdsad',
      Password: 'password',
    });
    req.flush({
      Status: 1,
      Token: 'token',
    });
  });
});
