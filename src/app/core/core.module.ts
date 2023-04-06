import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './views/header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HeaderViewModel } from './view-models/header/header-view-model';

/**
 * Módulo central de la aplicación que proporciona servicios y componentes comunes.
 * Incluye el componente del header y un interceptor
 * para añadir tokens de autenticación a las peticiones HTTP y para la funcionalidad del spinner.
 */
@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule],
  exports: [HeaderComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    HeaderViewModel

  ]
})
export class CoreModule {}
