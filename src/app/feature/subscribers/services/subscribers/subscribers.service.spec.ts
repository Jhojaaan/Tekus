import { TestBed } from '@angular/core/testing';

import { SubscribersService } from './subscribers.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { subscribersModel } from '../../models/subscribers.model';
import { environment } from 'src/environments/environment';

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

describe('SubscribersService', () => {
  let service: SubscribersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubscribersService],
    });
    service = TestBed.inject(SubscribersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('SubscribersService - should be created', () => {
    expect(service).toBeTruthy();
  });

  it('subscribersList - should call subscribersList and return subscribers', () => {
    service
      .subscribersList({
        page: 1,
        count: 10,
      })
      .subscribe({
        next: (res) => {
          expect(res).toEqual(subscribers);
        },
      });
    const req = httpMock.expectOne(
      `${environment.apiUrl}subscribers/?page=1&count=10`
    );
    expect(req.request.method).toBe('GET');
    req.flush(subscribers);
  });
  it('editSubscriber - should call editSubscriber', () => {
    service.editSubscriber(9143, subscribers.Data[0]).subscribe({
      next: (res) => {
        expect(res).toEqual(subscribers);
      },
    });
    const req = httpMock.expectOne(`${environment.apiUrl}subscribers/9143`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(subscribers.Data[0]);
    req.flush(subscribers);
  });

  it('addSubscriber - should call addSubscriber', () => {
    service.addSubscriber(subscribers.Data[0]).subscribe({
      next: (res) => {
        expect(res).toEqual(subscribers.Data[0]);
      },
    });
    const req = httpMock.expectOne(`${environment.apiUrl}subscribers/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      Subscribers: [
        {
          ...subscribers.Data[0],
          JobTitle: '',
          Topics: [],
        },
      ],
    });
    req.flush(subscribers.Data[0]);
  });

  it('deleteSubscriber - should call deleteSubscriber', () => {
    service.deleteSubscriber(9143).subscribe({
      next: (res) => {
        expect(res).toEqual(subscribers.Data[0]);
      },
    });
    const req = httpMock.expectOne(`${environment.apiUrl}subscribers/9143`);
    expect(req.request.method).toBe('DELETE');
    req.flush(subscribers.Data[0]);
  });
});
