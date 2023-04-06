import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginGuard } from './guards/login/login.guard';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LoginGuard, AuthService],
})
export class SharedModule {}
