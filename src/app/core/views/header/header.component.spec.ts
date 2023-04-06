import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HeaderViewModel } from '../../view-models/header/header-view-model';
import { AuthService } from 'src/app/shared/services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let headerViewModel: HeaderViewModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [HeaderViewModel, AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    headerViewModel = TestBed.inject(HeaderViewModel);
    fixture.detectChanges();
  });

  it('HeaderComponent - should create', () => {
    expect(component).toBeTruthy();
  });

  it('LogOut - should call logOut', () => {
    spyOn(headerViewModel, 'logOut');
    component.LogOut();
    expect(headerViewModel.logOut).toHaveBeenCalled();
  });
});
