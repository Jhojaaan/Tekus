import { Component } from '@angular/core';
import { subscriberModel } from '../../models/subscribers.model';
import { Subject, takeUntil } from 'rxjs';
import { SubscribersViewModel } from '../../view-models/subscribers/subscribers-view-model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-subscribers-list',
  templateUrl: './subscribers-list.component.html',
  styleUrls: ['./subscribers-list.component.scss'],
})
export class SubscribersListComponent {
  //Almacen los suscriptores
  public subscribersList: Subject<subscriberModel[]> = new Subject();
  //Observable que emite los suscriptores
  public subscribersList$ = this.subscribersList.asObservable();

  // Subject que indica cuándo se debe destruir el componente
  private destroyComponent$: Subject<void> = new Subject();

  /**
   * Constructor del componente
   * @param subscribersViewModel Se encarga de toda la lógica de los suscriptores
   * @param confirmationService Servicio que proporciona prime ng para la confirmacion de mensajes
   * @param messageService Servicio que proporciona prime ng para la creacion de mensajes tipo alertas
   */
  constructor(
    public readonly subscribersViewModel: SubscribersViewModel,
    public readonly confirmationService: ConfirmationService,
    public readonly messageService: MessageService
  ) {}

  //Obtiene los suscriptores, se suscribe a los cambios detectados del subscriberViewModel
  //Y cancela la suscripción cuando se destruye el componente
  ngOnInit(): void {
    this.subscribersViewModel.detectSubscriberChanges$
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe({
        next: () => {
          this.getSubscribers();
        },
      });
  }

  /**
   * Obtiene la lista de suscriptores
   */
  private getSubscribers(): void {
    this.subscribersViewModel.getSubscribers().subscribe({
      next: (subscribers: subscriberModel[]) => {
        this.subscribersList.next(subscribers);
      },
    });
  }

  /**
   * Función que se encarga del paginado de la tabla
   * @param page - El número de la nueva página seleccionada por el usuario
   * @param first - El índice del primer elemento de la nueva página
   * @param rows - El número de filas que se mostrarán en la nueva página
  */
  public onPageChange({
    page,
    first,
    rows,
  }: {
    page: number;
    first: number;
    rows: number;
  }): void {
    this.subscribersViewModel.page = page + 1;
    this.subscribersViewModel.first = first;
    this.subscribersViewModel.rowsPerPage = rows;

    this.getSubscribers();
  }

  /**
 * Función utilizada para optimizar el rendimiento en la renderización de listas mediante la identificación 
 * de los elementos que han sido modificados o actualizados.
 * Devuelve el valor de la propiedad 'Id' del objeto 'subscriberModel' recibido por parámetro.
 *
 * @param index El índice del elemento en la lista.
 * @param item El objeto del tipo 'subscriberModel' al que se está haciendo referencia en ese índice.
 * @returns El valor de la propiedad 'Id' del objeto 'subscriberModel'.
 */
  public trackByFn(index: number, item: subscriberModel): number {
    return item.Id;
  }

  /**
   * Destrucción del componente
   */
  ngOnDestroy(): void {
    // Se llama al método next() del objeto destroyComponent$ para notificar 
    //a los observables que se ha iniciado la destrucción del componente
    this.destroyComponent$.next();
    //Se llama al método complete() para completar el objeto destroyComponent$
    this.destroyComponent$.complete();
  }
}
