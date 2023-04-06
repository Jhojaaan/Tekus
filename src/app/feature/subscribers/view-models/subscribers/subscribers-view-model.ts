import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  subscriberModel,
  subscribersModel,
} from '../../models/subscribers.model';
import { EditSubscriberComponent } from '../../views/edit-subscriber/edit-subscriber.component';
import { SubscribersService } from '../../services/subscribers/subscribers.service';
import { MyDialogConfig } from '../../models/myDialogConfig';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable()
export class SubscribersViewModel {
  public page = 1;
  public first = 0;
  public count = 10;
  public rowsPerPage = 10;
  private detectSubscriberChanges: BehaviorSubject<null> = new BehaviorSubject(
    null
  );
  public detectSubscriberChanges$ = this.detectSubscriberChanges.asObservable();
  private dialogRef!: DynamicDialogRef;

  /**
   * Constructor de los servicios
   * @param subscribersServices Servicio que se utiliza para las operaciones de los suscriptores
   * @param dialogService Servicio que se utiliza para utilizar el dialog de primeng
   * @param messageService Servicio que se utiliza para el manejo de mensajes
   * @param confirmationService Servicio que se utiliza para la confirmación de una acción
   */
  constructor(
    private readonly subscribersServices: SubscribersService,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService
  ) {}

  /**
   * Obtener lista de suscriptores
   * @returns Observable con un array de objetos del tipo subscriberModel
   */
  public getSubscribers(): Observable<subscriberModel[]> {
    return this.subscribersServices
      .subscribersList({
        page: this.page,
        count: this.rowsPerPage,
      })
      .pipe(
        tap((subscribers: subscribersModel) => {
          this.count = subscribers.Count;
        }),
        map((subscribers: subscribersModel) => subscribers.Data)
      );
  }

  /**
   * Editar un suscriptor
   * @param id Id del suscriptor a editar 
   * @param subscriber Modelo que contiene los datos nuevos del suscriptor
   */
  public editSubscriber(id: number, subscriber: subscriberModel): void {
    this.subscribersServices.editSubscriber(id, subscriber).subscribe({
      next: () => {
        this.dialogRef.close();
        this.detectSubscriberChanges.next(null);
        this.messageService.add({
          severity: 'success',
          summary: 'Suscriptor actualizado',
          detail: 'se actualizaron los datos correctamente',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Ha ocurrido un error ${err}`,
        });
      },
    });
  }

  /**
   * Abrir modal para editar
   * @param subscriber Modelo de los datos del suscriptor
   */
  public openEditSubscriberModal(subscriber: subscriberModel): void {
    this.dialogRef = this.dialogService.open(EditSubscriberComponent, {
      data: subscriber,
      header: 'Editar suscriptor',
      styleClass: 'md:w-10 lg:w-5 w-11',
      contentStyle: { 'max-height': '90vh', overflow: 'auto' },
      draggable: true,
      mode: 'edit',
    } as MyDialogConfig);
  }

  /**
   * Agregar un nuevo suscriptor
   * @param subscriber Recibe subscriber que es el modelo que representa los datos del nuevo suscriptor
   */
  public addSubscriber(subscriber: subscriberModel): void {
    this.subscribersServices.addSubscriber(subscriber).subscribe({
      next: () => {
        this.dialogRef.close();
        this.messageService.add({
          severity: 'success',
          summary: 'Nuevo suscriptor',
          detail: 'se han agregado los datos correctamente',
        });
        this.detectSubscriberChanges.next(null);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Ha ocurrido un error ${err}`,
        });
      },
    });
  }

  /**
   * Abrir modal para agregar un nuevo suscriptor
   */
  public openAddSubscriberModal(): void {
    this.dialogRef = this.dialogService.open(EditSubscriberComponent, {
      data: {},
      header: 'Agregar suscriptor',
      styleClass: 'md:w-10 lg:w-5 w-11',
      contentStyle: { 'max-height': '90vh', overflow: 'auto' },
      draggable: true,
      mode: 'add',
    } as MyDialogConfig);
  }

  /**
   * Eliminación de un suscriptor
   * @param id Id del suscriptor a eliminar
   */
  public deleteSubscriber(id: number): void {
    this.confirmationService.confirm({
      message: '¿Desea eliminar este suscriptor?',
      header: 'Eliminar',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si,Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.subscribersServices.deleteSubscriber(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Suscriptor eliminado',
              detail: 'se eliminó correctamente',
            });
            this.detectSubscriberChanges.next(null);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Ha ocurrido un error ${err}`,
            });
          },
        });
      },
    });
  }
}
