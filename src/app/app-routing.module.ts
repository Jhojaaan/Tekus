import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './shared/guards/login/login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./feature/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    loadChildren: () => import('./feature/subscribers/subscribers.module').then((m) => m.SubscribersModule),
    canActivate: [LoginGuard],

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
