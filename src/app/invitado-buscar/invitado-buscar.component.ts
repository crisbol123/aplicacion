import { Component, Input, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraAdminLocalComponent } from '../barra-admin-local/barra-admin-local.component';
import { CedulaServiceService } from '../servicios/cedula-service.service';

@Component({
  selector: 'app-invitado-buscar',
  standalone: true,
  imports: [CommonModule,BarraAdminLocalComponent],
  templateUrl: './invitado-buscar.component.html',
  styleUrl: './invitado-buscar.component.css'
})
export class InvitadoBuscarComponent implements OnInit{

  constructor(private cedulaService: CedulaServiceService) { }

  ngOnInit(): void {
    const cedula = '123'; // Supongamos que tienes la cédula aquí
    console.log('Enviando cédula:', cedula);
    this.cedulaService.enviarCedula(cedula);
  }

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
