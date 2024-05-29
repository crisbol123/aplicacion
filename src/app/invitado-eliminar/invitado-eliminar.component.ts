import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EliminarInvitadoService } from '../servicios/servicio-invitado-eliminar/eliminar-invitado.service';
import { BarraAdminLocalComponent } from '../barra-admin-local/barra-admin-local.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-invitado-eliminar',
  standalone: true,
  imports: [BarraAdminLocalComponent, CommonModule, FormsModule],
  templateUrl: './invitado-eliminar.component.html',
  styleUrl: './invitado-eliminar.component.css'
})
export class InvitadoEliminarComponent implements OnInit {
  cedula: string = '';
  submitted: boolean = false;
  mensaje: string = '';

  constructor(private route: ActivatedRoute, private service: EliminarInvitadoService) {}

  ngOnInit(): void {
    // Obtener la cédula de los parámetros de la URL
    this.route.paramMap.subscribe(params => {
      this.cedula = params.get('cedula') || '';
    });
  }

  eliminarUsuario() {
    this.submitted = true;
    if (this.submitted) {
      this.postData();
    } else {
      console.log('El formulario contiene errores.');
    }
  }

  postData(): void {
    const datos = { cedula: this.cedula };

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


