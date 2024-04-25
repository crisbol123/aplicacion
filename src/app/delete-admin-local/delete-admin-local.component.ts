import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CRUDAdminGlobalComponent } from '../crud-admin-global/crud-admin-global.component';

@Component({
  selector: 'app-delete-admin-local',
  standalone: true,
  imports: [CommonModule,FormsModule,CRUDAdminGlobalComponent],
  templateUrl: './delete-admin-local.component.html',
  styleUrl: './delete-admin-local.component.css'
})
export class DeleteAdminLocalComponent {

  cedula: string = '';
  submitted: boolean = false;
  
  @ViewChild('registerForm', { static: false }) registerForm!: NgForm;
  eliminarUsuario() {
    this.submitted=true;
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    if (this.registerForm.valid) {
      // Si el formulario es válido, puedes continuar con el envío de datos o cualquier otra acción
      console.log(this.cedula);
    } else {
      // Si el formulario no es válido, no hagas nada o muestra un mensaje de error
      console.log('El formulario contiene errores.');
    }
    
  }

}
