import { Component,ViewChild } from '@angular/core';
import { FormsModule ,NgForm} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarraAdminLocalComponent } from '../barra-admin-local/barra-admin-local.component';

@Component({
  selector: 'app-invitado-crear',
  standalone: true,
  imports: [FormsModule,CommonModule,BarraAdminLocalComponent],
  templateUrl: './invitado-crear.component.html',
  styleUrl: './invitado-crear.component.css'
})
export class InvitadoCrearComponent {
  
  user = {
    cedula: '',
    nombre: '',
    contrasena: '',
    numero: '',
    correo: '',
    luces: false,
    alarma: false,
    temperatura: false,
    puerta1: false,
    puerta2: false,
    puerta3: false
  };

  formSubmitted = false;

  @ViewChild('registerForm', { static: false }) registerForm!: NgForm;
  onSubmit() {
    this.formSubmitted=true;
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    if (this.registerForm.valid) {
      // Si el formulario es válido, puedes continuar con el envío de datos o cualquier otra acción
      console.log(this.user);
    } else {
      // Si el formulario no es válido, no hagas nada o muestra un mensaje de error
      console.log('El formulario contiene errores.');
    }
    
  }
}