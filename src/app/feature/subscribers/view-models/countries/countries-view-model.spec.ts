import { TestBed } from '@angular/core/testing';

import { CountriesViewModel } from './countries-view-model';
import { CountriesService } from '../../services/countries/countries.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CountriesModel } from '../../models/country.model';

describe('CountriesViewModelService', () => {
  let model: CountriesViewModel;
  let countriesService: CountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesViewModel, CountriesService],
    });
    model = TestBed.inject(CountriesViewModel);
    countriesService = TestBed.inject(CountriesService);
  });

  it('CountriesViewModelService- should be created', () => {
    expect(model).toBeTruthy();
  });

  it('getCountries - should call getCountries', () => {
    const spy = spyOn(countriesService, 'getCountries').and.returnValue(
      of({} as CountriesModel)
    );
    model.getCountries().subscribe({
      next: (data) => {
        expect(data).toEqual({} as CountriesModel);
      },
    });
    expect(spy).toHaveBeenCalled();
  });
});
