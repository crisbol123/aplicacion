import { Component, ViewChild} from '@angular/core';
import { BarraAdminLocalComponent } from '../barra-admin-local/barra-admin-local.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActualizarInvitadoService } from '../servicios/servicio-invitado-actualizar/actualizar-invitado.service';

@Component({
  selector: 'app-invitado-actualizar',
  standalone: true,
  imports: [FormsModule,CommonModule,BarraAdminLocalComponent],
  templateUrl: './invitado-actualizar.component.html',
  styleUrl: './invitado-actualizar.component.css'
})
export class InvitadoActualizarComponent {

  mensaje: string = "";
  //cedulaRegistrada: boolean = false;

  constructor(private service: ActualizarInvitadoService){}
  
  user = {
    alarma: 0,
    cedula: '',
    contrasena: '',
    correo: '',
    luz1: 0,
    luz2: 0,
    luz3: 0,
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
      (response) => {
        this.mensaje = response.respuesta || this.mensaje;
        console.log(this.mensaje);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
