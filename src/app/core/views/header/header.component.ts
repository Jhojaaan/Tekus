import { Component } from '@angular/core';
import { HeaderViewModel } from '../../view-models/header/header-view-model';
// import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  /**
  * Constructor de la clase.
  * @param headerViewModel - EL ViewModel del header.
  */
  constructor(private readonly headerViewModel: HeaderViewModel){

  }

  /**
  * Cierra la sesión del usuario actual.
  * Llama al método `logOut()` del viewModel del header.
  */
  public LogOut(): void{
    this.headerViewModel.logOut();
  }

}
