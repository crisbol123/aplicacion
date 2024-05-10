import { Component, Input, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraAdminLocalComponent } from '../barra-admin-local/barra-admin-local.component';
import { CedulaServiceService } from '../servicios/cedula-service.service';
import { BuscarInvitadoService } from '../servicios/servicio-invitado-buscar/buscar-invitado.service';

@Component({
  selector: 'app-invitado-buscar',
  standalone: true,
  imports: [CommonModule,BarraAdminLocalComponent],
  templateUrl: './invitado-buscar.component.html',
  styleUrl: './invitado-buscar.component.css'
})
export class InvitadoBuscarComponent implements OnInit{

  users: any[] = []; // Inicializar como arreglo vacío

  constructor(private service: BuscarInvitadoService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.service.getRequest().subscribe(
      (data: any) => {
        this.users = data.value; // Asignar el arreglo de objetos a users
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }
  

}
