import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CRUDAdminGlobalComponent } from '../crud-admin-global/crud-admin-global.component';
import { CrudGlobalService } from '../servicios/crud-global.service';

@Component({
  selector: 'app-update-admin-local',
  standalone: true,
  imports: [FormsModule,CommonModule,CRUDAdminGlobalComponent],
  templateUrl: './update-admin-local.component.html',
  styleUrl: './update-admin-local.component.css'
})
export class UpdateAdminLocalComponent {
  mensaje: string="";
  cedulaRegistrada: boolean = false;
  upload: boolean = false;
  user = {
    cedula: '',
    nombre: '',
    contrasena: '',
    numero: '',
    correo: ''
  };
  constructor(private service: CrudGlobalService){}

  formSubmitted = false;
  @ViewChild('registerForm', { static: false }) registerForm!: NgForm;
  onSubmit() {
    this.formSubmitted=true;
    
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    if (this.registerForm.valid) {
      // Si el formulario es válido, puedes continuar con el envío de datos o cualquier otra acción
      const data = { cedula: this.user.cedula, nombre: this.user.nombre, contraseña: this.user.contrasena, numero: this.user.numero, correo: this.user.correo };
      this.service.actualizar(data).subscribe((response) => {
        console.log(response); 
        console.log(data); 
        this.upload= false;
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
}
