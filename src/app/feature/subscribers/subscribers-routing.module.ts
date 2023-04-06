import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/shared/guards/login/login.guard';
import { SubscribersListComponent } from './views/subscribers-list/subscribers-list.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [LoginGuard],
    component: SubscribersListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscribersRoutingModule {}
