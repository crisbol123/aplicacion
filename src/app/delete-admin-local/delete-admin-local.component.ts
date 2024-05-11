import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CRUDAdminGlobalComponent } from '../crud-admin-global/crud-admin-global.component';
import { CrudGlobalService } from '../servicios/crud-global.service';

@Component({
  selector: 'app-delete-admin-local',
  standalone: true,
  imports: [CommonModule,FormsModule,CRUDAdminGlobalComponent],
  templateUrl: './delete-admin-local.component.html',
  styleUrl: './delete-admin-local.component.css'
})
export class DeleteAdminLocalComponent {
  mensaje: string="";
  cedulaRegistrada: boolean = false;
  cedula: string = '';
  submitted: boolean = false;
  upload: boolean = false;
  constructor(private service: CrudGlobalService){};
  @ViewChild('eliminarForm', { static: false }) eliminarForm!: NgForm;
  eliminarUsuario() {
    this.submitted=true;

  

    // Aquí puedes manejar la lógica para enviar los datos del formulario
    if (this.eliminarForm.valid) {
        // Si el formulario es válido, puedes continuar con el envío de datos o cualquier otra acción
        const data = { cedula: this.cedula};
        this.service.eliminar(data).subscribe((response) => {
          console.log(response); 
          console.log(data); 
          this.upload=true;
        },(error)=>{
          console.log(error); 
          this.mensaje = error.error.message;
          console.log("kbkbkbkjb");
          this.cedulaRegistrada = true;
        })
      // Si el formulario es válido, puedes continuar con el envío de datos o cualquier otra acción
      console.log(this.cedula);
    } else {
      // Si el formulario no es válido, no hagas nada o muestra un mensaje de error
      console.log('El formulario contiene errores.');
    }
    
  }
}

