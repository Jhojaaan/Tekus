import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CountriesService } from './countries.service';
import { environment } from 'src/environments/environment';
import { CountriesModel } from '../../models/country.model';

let countries: CountriesModel = {
  Count: 10,
  Data: [
    {
      Code: 'AF',
      Name: 'Afghanistan',
      PhoneCode: '93',
    },
  ],
};

describe('CountriesService', () => {
  let service: CountriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesService],
    });
    service = TestBed.inject(CountriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('CountriesService - should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCountries - shold get countries', () => {
    service.getCountries().subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        expect(response).toBe(countries);
      },
    });
    const req = httpMock.expectOne(`${environment.apiUrl}countries/?Count=255`);
    req.flush(countries);
    httpMock.verify();
    expect(req.request.method).toBe('GET');
  });
});
