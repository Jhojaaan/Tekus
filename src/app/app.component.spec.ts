import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/views/header/header.component';
import { HeaderViewModel } from './core/view-models/header/header-view-model';
import { AuthService } from './shared/services/auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgxSpinnerModule],
      declarations: [AppComponent, HeaderComponent],
      providers: [
        HeaderViewModel,
        AuthService,
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set the currentRoute property when a navigation event occurs', fakeAsync(() => {
    router.navigate(['/']);
    tick();
    expect(component.currentRoute).toBe('/');
  }));
});
