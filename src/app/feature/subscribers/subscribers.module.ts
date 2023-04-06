import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribersListComponent } from './views/subscribers-list/subscribers-list.component';
import { SubscribersRoutingModule } from './subscribers-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from 'src/app/core/core.module';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EditSubscriberComponent } from './views/edit-subscriber/edit-subscriber.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscribersService } from './services/subscribers/subscribers.service';
import { SubscribersViewModel } from './view-models/subscribers/subscribers-view-model';
import { CountriesService } from './services/countries/countries.service';
import { CountriesViewModel } from './view-models/countries/countries-view-model';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MyDialogConfig } from './models/myDialogConfig';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

/**
 * Módulo encargado de manejar la funcionalidad del suscriptor.
 */
@NgModule({
  declarations: [SubscribersListComponent, EditSubscriberComponent],
  imports: [
    CommonModule,
    SubscribersRoutingModule,
    HttpClientModule,
    CoreModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    DynamicDialogModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ConfirmDialogModule,    
  ],
  providers: [
    SubscribersService,
    SubscribersViewModel,
    CountriesViewModel,
    MessageService,
    DialogService,
    CountriesService,
    MyDialogConfig,
    ConfirmationService,
  ],
})
export class SubscribersModule {}
