import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubscriberComponent } from './edit-subscriber.component';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountriesViewModel } from '../../view-models/countries/countries-view-model';
import { SubscribersViewModel } from '../../view-models/subscribers/subscribers-view-model';
import { CountriesService } from '../../services/countries/countries.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SubscribersService } from '../../services/subscribers/subscribers.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MyDialogConfig } from '../../models/myDialogConfig';
import { DropdownModule } from 'primeng/dropdown';
import { CountriesModel } from '../../models/country.model';
import { of } from 'rxjs';

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

describe('EditSubscriberComponent', () => {
  let component: EditSubscriberComponent;
  let fixture: ComponentFixture<EditSubscriberComponent>;
  let countriesViewModel: CountriesViewModel;
  let subscriberViewModel: SubscribersViewModel;
  let dynamicDialogRef: DynamicDialogRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DynamicDialogModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        DropdownModule,
      ],
      declarations: [EditSubscriberComponent],
      providers: [
        CountriesViewModel,
        SubscribersViewModel,
        DynamicDialogConfig,
        DynamicDialogRef,
        CountriesService,
        SubscribersService,
        DialogService,
        MessageService,
        ConfirmationService,
        MyDialogConfig,
      ],
    }).compileComponents();

    countriesViewModel = TestBed.inject(CountriesViewModel);
    subscriberViewModel = TestBed.inject(SubscribersViewModel);
    fixture = TestBed.createComponent(EditSubscriberComponent);
    dynamicDialogRef = TestBed.inject(DynamicDialogRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('EditSubscriberComponent - should create', () => {
    expect(component).toBeTruthy();
  });

  it('initForm - should create form', () => {
    expect(component.editSubscriberForm.value).toEqual({
      Name: null,
      Email: null,
      CountryCode: null,
      CountryName: null,
      PhoneNumber: null,
      Area: null,
      SubscriptionStateDescription: null,
    });
  });

  it('ngOnInit - should call getCountries', () => {
    spyOn(countriesViewModel, 'getCountries').and.returnValue(of(countries));
    component.ngOnInit();
    expect(countriesViewModel.getCountries).toHaveBeenCalled();
  });

  it('editSubscriber - should call subscriberViewModel.editSubscriber', () => {
    spyOn(countriesViewModel, 'getCountries').and.returnValue(of(countries));
    (component as any).dynamicDialogConfig = {
      ...(component as any).dynamicDialogConfig,
      mode: 'edit',
      data: {
        Id: 100,
      },
    };
    component.ngOnInit();
    const spy = spyOn(subscriberViewModel, 'editSubscriber');
    component.editSubscriber();
    expect(spy).toHaveBeenCalled();
  });

  it('addSubscriber - should call subscriberViewModel.addSubscriber', () => {
    spyOn(countriesViewModel, 'getCountries').and.returnValue(of(countries));
    (component as any).dynamicDialogConfig = {
      ...(component as any).dynamicDialogConfig,
      mode: 'add',
      data: {
        Id: 100,
      },
    };
    component.ngOnInit();
    const spy = spyOn(subscriberViewModel, 'addSubscriber');
    component.editSubscriber();
    expect(spy).toHaveBeenCalled();
  });

  it('onCountryChange - should change countri', () => {
    spyOn(countriesViewModel, 'getCountries').and.returnValue(of(countries));
    component.ngOnInit();
    component.onCountryChange({ value: 'AF' });
    expect(component.editSubscriberForm.controls['CountryName'].value).toEqual(
      'Afghanistan'
    );
  });

  it('closeDialog - should call dynamicDialogRef.close', () => {
    const spy = spyOn(dynamicDialogRef, 'close');
    component.closeDialog();
    expect(spy).toHaveBeenCalled();
  });
});
