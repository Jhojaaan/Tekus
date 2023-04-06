import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginViewModel } from '../../view-models/login-view-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /**
   * FormGroup para el formulario de inicio de sesión.
   */
  public loginForm!: FormGroup;

  /**
   * Constructor del componente LoginComponent.
   * @param fb Servicio FormBuilder de Angular para crear formularios reactivos.
   * @param loginViewModel ViewModel que maneja la lógica de negocio del inicio de sesión.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly loginViewModel: LoginViewModel
  ) {}

  /**
   * Método que se ejecuta cuando se carga el componente LoginComponent.
   * Crea el FormGroup para el formulario de inicio de sesión.
   */
  ngOnInit(): void {
    this.createLoginForm();
  }

  
  /**
   * Crea el FormGroup para el formulario de inicio de sesión.
   * Asigna los FormControl para UserName y Password.
   */
  private createLoginForm(): void {
    this.loginForm = this.fb.group({
      UserName: [''],
      Password: [''],
    });
  }

   /**
   * Invoca el método loginUser() del ViewModel de inicio de sesión para iniciar sesión.
   * Pasa como parámetro los valores del formulario de inicio de sesión.
   */
  public loginUser(): void {
    this.loginViewModel.loginUser(this.loginForm.value);
  }
}
