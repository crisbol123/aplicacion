import { Component,ViewChild } from '@angular/core';
import { FormsModule ,NgForm} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarraAdminLocalComponent } from '../barra-admin-local/barra-admin-local.component';
import { CrearInvitadoService } from '../servicios/crear-invitado.service';

@Component({
  selector: 'app-invitado-crear',
  standalone: true,
  imports: [FormsModule,CommonModule,BarraAdminLocalComponent],
  templateUrl: './invitado-crear.component.html',
  styleUrl: './invitado-crear.component.css'
})
export class InvitadoCrearComponent {

  constructor(private service: CrearInvitadoService) {}
  
  user = {
    alarma: 0,
    cedula: '',
    contrasena: '',
    correo: '',
    luces: 0,
    nombre: '',
    numero: '',
    puerta1: 0,
    puerta2: 0,
    puerta3: 0,
    temperatura: 0
  };

  formSubmitted = false;

  @ViewChild('registerForm', { static: false }) registerForm!: NgForm;
  onSubmit() {
    this.formSubmitted=true;
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    if (this.registerForm.valid) {
      // Si el formulario es válido, puedes continuar con el envío de datos o cualquier otra acción
      console.log(this.user);
      this.postData();
    } else {
      // Si el formulario no es válido, no hagas nada o muestra un mensaje de error
      console.log('El formulario contiene errores.');
    }
    
  }

  postData(): void {
    const datos = { estado: this.user };

    this.service.postRequest(datos).subscribe(
      () => {
      },
      (error) => {
        console.log('Error al enviar datos:', error);
      }
    );
  }
}