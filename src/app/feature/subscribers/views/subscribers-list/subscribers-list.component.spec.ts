import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribersListComponent } from './subscribers-list.component';
import { SubscribersViewModel } from '../../view-models/subscribers/subscribers-view-model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SubscribersService } from '../../services/subscribers/subscribers.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { subscribersModel } from '../../models/subscribers.model';
import { of } from 'rxjs';

const subscribers: subscribersModel = {
  Count: 1,
  Data: [
    {
      SystemId: null,
      Area: '',
      PublicId: 632,
      CountryCode: 'CO',
      CountryName: 'Colombia',
      Name: 'test11',
      EndpointsCount: 0,
      Email: 'nuevo11@GMAIL.COM',
      JobTitle: '',
      PhoneNumber: '5214542',
      PhoneCode: '57',
      PhoneCodeAndNumber: '(57) 5214542',
      LastActivityUtc: null,
      LastActivity: null,
      LastActivityString: null,
      SubscriptionDate: null,
      SubscriptionMethod: 0,
      SubscriptionState: 0,
      SubscriptionStateDescription: 'Pendiente',
      Topics: [],
      ValidEmail: true,
      Activity: '--',
      ConnectionState: 2,
      Id: 9143,
    },
  ],
};

describe('SubscribersListComponent', () => {
  let component: SubscribersListComponent;
  let fixture: ComponentFixture<SubscribersListComponent>;
  let subscribersViewModel: SubscribersViewModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastModule, ConfirmDialogModule],
      declarations: [SubscribersListComponent],
      providers: [
        SubscribersViewModel,
        ConfirmationService,
        MessageService,
        SubscribersService,
        DialogService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscribersListComponent);
    component = fixture.componentInstance;
    subscribersViewModel = TestBed.inject(SubscribersViewModel);
    fixture.detectChanges();
  });

  it('SubscribersListComponent - should create', () => {
    expect(component).toBeTruthy();
  });

  it('getSubscribers - should call getSubscribers', () => {
    spyOn(subscribersViewModel, 'getSubscribers').and.returnValue(
      of(subscribers.Data)
    );
    spyOn(component.subscribersList, 'next').and.callThrough();
    component.ngOnInit();
    expect(subscribersViewModel.getSubscribers).toHaveBeenCalled();
    expect(component.subscribersList.next).toHaveBeenCalledWith(
      subscribers.Data
    );
  });

  it('onPageChange - should call onPageChange', () => {
    spyOn(subscribersViewModel, 'getSubscribers').and.returnValue(
      of(subscribers.Data)
    );
    spyOn(component.subscribersList, 'next').and.callThrough();
    component.onPageChange({
      first: 20,
      rows: 20,
      page: 2,
    });
    expect(subscribersViewModel.getSubscribers).toHaveBeenCalled();
    expect(component.subscribersList.next).toHaveBeenCalledWith(subscribers.Data);
    expect(subscribersViewModel.page).toEqual(3);
    expect(subscribersViewModel.rowsPerPage).toEqual(20);
    expect(subscribersViewModel.first).toEqual(20);

  });


  it('trackByFn - should call trackByFn', () => {
    const index = 1;
    const item = subscribers.Data[0];
    const result = component.trackByFn(index, item);
    expect(result).toEqual(item.Id);
  });
});
