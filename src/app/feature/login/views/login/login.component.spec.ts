import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginViewModel } from '../../view-models/login-view-model';
import { LoginService } from '../../services/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginViewModel: LoginViewModel;

  const formValue = {
    UserName: '',
    Password: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [LoginComponent],
      providers: [LoginViewModel, LoginService, MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    loginViewModel = TestBed.inject(LoginViewModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('createLoginForm - should create login form', () => {
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.value).toEqual(formValue);
  });

  it('loginUser - should call loginUser', () => {
    spyOn(loginViewModel, 'loginUser').and.callThrough();
    component.loginForm.patchValue({
      UserName: 'test',
      Password: 'test',
    });
    component.loginUser();
    expect(loginViewModel.loginUser).toHaveBeenCalledWith({
      UserName: 'test',
      Password: 'test',
    });
  });
});
