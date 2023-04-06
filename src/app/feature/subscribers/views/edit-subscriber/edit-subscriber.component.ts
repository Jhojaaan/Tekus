import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CountriesViewModel } from '../../view-models/countries/countries-view-model';
import { CountriesModel, CountryModel } from '../../models/country.model';
import { SubscribersViewModel } from '../../view-models/subscribers/subscribers-view-model';
import { MyDialogConfig } from '../../models/myDialogConfig';

/**
 * Componente para editar un suscriptor existente o agregar uno nuevo.
 */
@Component({
  selector: 'app-edit-subscriber',
  templateUrl: './edit-subscriber.component.html',
  styleUrls: ['./edit-subscriber.component.scss'],
})
export class EditSubscriberComponent {
  /**
   * Formulario para editar un suscriptor.
   */
  public editSubscriberForm!: FormGroup;
  /**
   * Lista de países para seleccionar en el formulario.
   */
  public countries!: CountryModel[];
  /**
   * Modo en que se muestra el formulario ('edit' para editar un suscriptor existente o 'add' para agregar uno nuevo).
   */
  public mode!: string;
  /**
   * Lista de estados de suscripción disponibles.
   */
  public statesList: string[] = ['Pendiente', 'Activo', 'Inactivo'];

  /**
   * Constructor del componente
   * @param fb Servicio FormBuilder de Angular para crear formularios reactivos.
   * @param dynamicDialogConfig Proporciona acceso a los datos pasados al diálogo al abrirlo.
   * @param dynamicDialogRef Se utiliza para cerrar el diálogo y pasar los datos de vuelta al componente que lo abrió.
   * @param countriesViewModel Se utiliza para obtener los datos de los países
   * @param subscriberViewModel Se utiliza para realizar operaciones relacionadas con los suscriptores.
   * @param myDialogConfig Modelo definido en la aplicación que contiene información específica del diálogo.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly dynamicDialogConfig: DynamicDialogConfig,
    private readonly dynamicDialogRef: DynamicDialogRef,
    public readonly countriesViewModel: CountriesViewModel,
    private readonly subscriberViewModel: SubscribersViewModel,
    private myDialogConfig: MyDialogConfig
  ) {}

/**
 * Método que se ejecuta al inicializar el componente.
 * Inicializa el formulario de edición de suscriptores,
 * obtiene los países disponibles y establece los valores iniciales del formulario.
 */
  ngOnInit(): void {
    this.initForm();
    this.getCountries();
    this.editSubscriberForm.patchValue(this.dynamicDialogConfig.data);
    this.myDialogConfig = this.dynamicDialogConfig;
  }

  /**
   * Funcion que se encarga de editar o añadir un nuevo suscriptor
   */
  public editSubscriber(): void {
    if (this.myDialogConfig.mode === 'edit') {
      this.subscriberViewModel.editSubscriber(
        this.dynamicDialogConfig.data.Id,
        this.editSubscriberForm.value
      );
    } else {
      this.subscriberViewModel.addSubscriber(this.editSubscriberForm.value);
    }
  }

  /**
   * Funcion que inicializa el formulario
   */
  private initForm(): void {
    this.editSubscriberForm = this.fb.group({
      Name: [
        ,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      Email: [, [Validators.required, Validators.email]],
      CountryCode: [, [Validators.required]],
      CountryName: [],
      PhoneNumber: [, [Validators.pattern('^[0-9]+$')]],
      Area: [],
      SubscriptionStateDescription: [, [Validators.required]],
    });
  }

  /**
   * Funcion que obtiene la lista de paises
   */
  private getCountries(): void {
    this.countriesViewModel.getCountries().subscribe({
      next: (countries: CountriesModel) => {
        this.countries = countries.Data;
      },
    });
  }

  /**
   * Funcion que se ejecuta cuando se cambia de pais
   * @param value valor del pais selecionado
   */
  public onCountryChange({ value }: { value: string }): void {
    this.editSubscriberForm.patchValue({
      CountryName: this.getCountryWithCode(value)?.Name,
    });
  }
/**
 * Funcion que devuelve el modelo CountryModel correspondiente al pais seleciionado
 * @param code Codigo del pais a buscar 
 * @returns Obejto CountryModel
 */
  private getCountryWithCode(code: string): CountryModel | undefined {
    return this.countries.find((country) => country.Code === code);
  }

  public closeDialog(): void {
    this.dynamicDialogRef.close();
  }
}
