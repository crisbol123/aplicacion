import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraAdminLocalComponent } from '../barra-admin-local/barra-admin-local.component';

@Component({
  selector: 'app-invitado-buscar',
  standalone: true,
  imports: [CommonModule,BarraAdminLocalComponent],
  templateUrl: './invitado-buscar.component.html',
  styleUrl: './invitado-buscar.component.css'
})
export class InvitadoBuscarComponent {
  user = {
    cedula: '123',
    nombre: 'Carlos',
    contrasena: 'asdjkakjsd',
    numero: '312135',
    correo: 'asda@aisjd.com',
    luces: false,
    alarma: false,
    temperatura: false,
    puerta1: false,
    puerta2: false,
    puerta3: true
  };
}
