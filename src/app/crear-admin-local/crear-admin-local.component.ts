import { Component,ViewChild } from '@angular/core';
import { FormsModule ,NgForm} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CRUDAdminGlobalComponent } from '../crud-admin-global/crud-admin-global.component';
import { CrudGlobalService } from '../servicios/crud-global.service';
import { response } from 'express';
import { error } from 'node:console';
@Component({
  selector: 'app-crear-admin-local',
  standalone: true,
  imports: [FormsModule,CommonModule,CRUDAdminGlobalComponent],
  templateUrl: './crear-admin-local.component.html',
  styleUrl: './crear-admin-local.component.css'
})
export class CrearAdminLocalComponent {
  mensaje: string="";
  cedulaRegistrada: boolean = false;
  user = {
    cedula: '',
    nombre: '',
    contrasena: '',
    numero: '',
    correo: ''
  };
  formSubmitted = false;
  upload: boolean = false;
  constructor(private service: CrudGlobalService){}
  @ViewChild('registerForm', { static: false }) registerForm!: NgForm;
  onSubmit() {
    this.formSubmitted=true;
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    if (this.registerForm.valid) {
      // Si el formulario es válido, puedes continuar con el envío de datos o cualquier otra acción
      const data = { cedula: this.user.cedula, nombre: this.user.nombre, contraseña: this.user.contrasena, numero: this.user.numero, correo: this.user.correo };
      this.service.crear(data).subscribe((response) => {
        console.log(response); 
        console.log(data);
        this.upload=true; 
      },(error)=>{
        console.log(error); 
        this.mensaje = error.error.message;
        console.log("kbkbkbkjb");
        this.cedulaRegistrada = true;
      })
      console.log(this.user);
    } else {
      // Si el formulario no es válido, no hagas nada o muestra un mensaje de error
      console.log('El formulario contiene errores.');
    }
    
  }
 /* postData(): void {
    const datos = { estado: this.user };

    this.service.crear(datos).subscribe(
      (response) => {
        this.mensaje = response.respuesta || this.mensaje;
        console.log(this.mensaje);
      },
      (error) => {
        //console.log('Error al enviar datos:', error);
        this.mensaje = error.error.message;
        console.log(this.mensaje);
        this.cedulaRegistrada = true;
      }
    );
  }*/
}

export class adminlocal{
  nombre: any;
  cedula: any;
  contraseña: any;
  numero: any;
  correo: any;
}
