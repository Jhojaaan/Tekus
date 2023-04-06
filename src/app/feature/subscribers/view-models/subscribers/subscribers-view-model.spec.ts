import { TestBed } from '@angular/core/testing';
import { SubscribersViewModel } from './subscribers-view-model';
import { SubscribersService } from '../../services/subscribers/subscribers.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService, Confirmation } from 'primeng/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  subscriberModel,
  subscribersModel,
} from '../../models/subscribers.model';
import { of, throwError } from 'rxjs';

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

describe('SubscribersViewModel', () => {
  let model: SubscribersViewModel;
  let subscribersServices: SubscribersService;
  let messageService: MessageService;
  let dialogService: DialogService;
  let confirmationService: ConfirmationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SubscribersViewModel,
        SubscribersService,
        DialogService,
        MessageService,
        ConfirmationService,
      ],
    });
    model = TestBed.inject(SubscribersViewModel);
    subscribersServices = TestBed.inject(SubscribersService);
    messageService = TestBed.inject(MessageService);
    dialogService = TestBed.inject(DialogService);
    confirmationService = TestBed.inject(ConfirmationService);
  });
  it('SubscribersViewModel - should create an instance', () => {
    expect(model).toBeTruthy();
  });

  it('getSubscribers - should call subscribersServices.subscribersList', () => {
    spyOn(subscribersServices, 'subscribersList').and.returnValue(
      of(subscribers)
    );
    model.getSubscribers().subscribe({
      next: (data) => {
        expect(data).toEqual(subscribers.Data);
      },
    });
    expect(subscribersServices.subscribersList).toHaveBeenCalledWith({
      page: 1,
      count: 10,
    });
    expect(model.count).toEqual(subscribers.Count);
  });

  it('editSubscriber - should call subscribersServices.editSubscriber', () => {
    spyOn(subscribersServices, 'editSubscriber').and.returnValue(
      of({} as subscribersModel)
    );
    spyOn(messageService, 'add').and.callThrough();
    spyOn(dialogService, 'open').and.callThrough();
    model.detectSubscriberChanges$.subscribe({
      next: (data) => {
        expect(data).toEqual(null);
      },
    });
    model.openEditSubscriberModal(subscribers.Data[0]);
    expect(dialogService.open).toHaveBeenCalled();
    model.editSubscriber(934, subscribers.Data[0]);
    expect(subscribersServices.editSubscriber).toHaveBeenCalledWith(
      934,
      subscribers.Data[0]
    );
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Suscriptor actualizado',
      detail: 'se actualizaron los datos correctamente',
    });
  });

  it('editSubscriber - should call subscribersServices.editSubscriber with error', () => {
    const errorMessage = { error: 'fail' };
    const errorResponse = { error: errorMessage };
    spyOn(subscribersServices, 'editSubscriber').and.returnValue(
      throwError(() => errorResponse)
    );
    spyOn(messageService, 'add').and.callThrough();
    spyOn(dialogService, 'open').and.callThrough();
    model.detectSubscriberChanges$.subscribe({
      next: (data) => {
        expect(data).toEqual(null);
      },
    });
    model.openEditSubscriberModal(subscribers.Data[0]);
    expect(dialogService.open).toHaveBeenCalled();
    model.editSubscriber(934, subscribers.Data[0]);
    expect(subscribersServices.editSubscriber).toHaveBeenCalledWith(
      934,
      subscribers.Data[0]
    );
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: `Ha ocurrido un error ${errorMessage}`,
    });
  });

  it('addSubscriber - should call subscribersServices.addSubscribe', () => {
    spyOn(subscribersServices, 'addSubscriber').and.returnValue(
      of({} as subscriberModel)
    );
    spyOn(messageService, 'add').and.callThrough();
    spyOn(dialogService, 'open').and.callThrough();
    model.detectSubscriberChanges$.subscribe({
      next: (data) => {
        expect(data).toEqual(null);
      },
    });
    model.openAddSubscriberModal();
    expect(dialogService.open).toHaveBeenCalled();
    model.addSubscriber(subscribers.Data[0]);
    expect(subscribersServices.addSubscriber).toHaveBeenCalledWith(
      subscribers.Data[0]
    );
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Nuevo suscriptor',
      detail: 'se han agregado los datos correctamente',
    });
  });

  it('addSubscriber - should call subscribersServices.addSubscribe with error', () => {
    const errorMessage = { error: 'fail' };
    const errorResponse = { error: errorMessage };
    spyOn(subscribersServices, 'addSubscriber').and.returnValue(
      throwError(() => errorResponse)
    );
    spyOn(messageService, 'add').and.callThrough();
    spyOn(dialogService, 'open').and.callThrough();
    model.detectSubscriberChanges$.subscribe({
      next: (data) => {
        expect(data).toEqual(null);
      },
    });
    model.openAddSubscriberModal();
    expect(dialogService.open).toHaveBeenCalled();
    model.addSubscriber(subscribers.Data[0]);
    expect(subscribersServices.addSubscriber).toHaveBeenCalledWith(
      subscribers.Data[0]
    );
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: `Ha ocurrido un error ${errorMessage}`,
    });
  });

  it('deleteSubscriber - should call subscribersServices.deleteSubscriber', () => {
    spyOn(subscribersServices, 'deleteSubscriber').and.returnValue(
      of({} as subscriberModel)
    );
    spyOn(messageService, 'add').and.callThrough();
    spyOn(confirmationService, 'confirm').and.callFake(
      (params: Confirmation) => {
        return (params as any).accept();
      }
    );
    model.detectSubscriberChanges$.subscribe({
      next: (data) => {
        expect(data).toEqual(null);
      },
    });
    model.deleteSubscriber(934);
    confirmationService.accept;
    expect(confirmationService.confirm).toHaveBeenCalled();
    expect(subscribersServices.deleteSubscriber).toHaveBeenCalledWith(934);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Suscriptor eliminado',
      detail: 'se eliminó correctamente',
    });
  });

  it('deleteSubscriber - should call subscribersServices.deleteSubscriber with erros', () => {
    const errorMessage = { error: 'fail' };
    const errorResponse = { error: errorMessage };
    spyOn(subscribersServices, 'deleteSubscriber').and.returnValue(
      throwError(() => errorResponse)
    );
    spyOn(messageService, 'add').and.callThrough();
    spyOn(confirmationService, 'confirm').and.callFake(
      (params: Confirmation) => {
        return (params as any).accept();
      }
    );
    model.detectSubscriberChanges$.subscribe({
      next: (data) => {
        expect(data).toEqual(null);
      },
    });
    model.deleteSubscriber(934);
    confirmationService.accept;
    expect(confirmationService.confirm).toHaveBeenCalled();
    expect(subscribersServices.deleteSubscriber).toHaveBeenCalledWith(934);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: `Ha ocurrido un error ${errorResponse}`,
    });
  });
});
