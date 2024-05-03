import { Component, Input, OnInit } from '@angular/core';
import { BarraAdminLocalComponent } from '../barra-admin-local/barra-admin-local.component';
import { ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InvitadoBuscarComponent } from '../invitado-buscar/invitado-buscar.component';
import { CedulaServiceService } from '../servicios/cedula-service.service';

@Component({
  selector: 'app-invitado-eliminar',
  standalone: true,
  imports: [BarraAdminLocalComponent,CommonModule,FormsModule],
  templateUrl: './invitado-eliminar.component.html',
  styleUrl: './invitado-eliminar.component.css'
})
export class InvitadoEliminarComponent implements OnInit{
  cedula: string = '';
  submitted: boolean = false;

  cedulaG: string = '';

  constructor(private cedulaService: CedulaServiceService) { }

  ngOnInit(): void {
    this.cedulaService.cedula$.subscribe(cedula => {
      console.log('Cédula recibida:', cedula);
      this.cedulaG = cedula;
    });
  }

  eliminarUsuario() {
    this.submitted = true;
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    if (this.submitted) {
      // Si el formulario es válido, puedes continuar con el envío de datos o cualquier otra acción
      console.log(this.cedula);
    } else {
      // Si el formulario no es válido, no hagas nada o muestra un mensaje de error
      console.log('El formulario contiene errores.');
    }
  }

}
