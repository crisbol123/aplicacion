import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucesComponent } from "../luces/luces.component";
import { BarraAdminLocalComponent } from "../barra-admin-local/barra-admin-local.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlarmaComponent } from "../alarma/alarma.component";
import { PuertasComponent } from '../puertas/puertas.component';
import { TemperaturaComponent } from '../temperatura/temperatura.component';
import { SolicitudesAlarmaService } from '../solicitudes-alarma.service';
import { AlertService } from '../alert.service';
import { LucesTiempoService } from '../luces-tiempo.service';
import { ServiciosService } from '../servicios/servicio-modo1/servicios.service';

@Component({
  selector: 'app-interfaz-principal',
  standalone: true,
  templateUrl: './interfaz-principal.component.html',
  styleUrls: ['./interfaz-principal.component.css'],
  imports: [CommonModule, FormsModule, LucesComponent, BarraAdminLocalComponent, MatButtonModule, MatIconModule, AlarmaComponent, PuertasComponent, TemperaturaComponent]
})
export class InterfazPrincipalComponent implements OnInit {
  
  mostrarComponente: boolean = false;
  mostrarComponente2: boolean = false;
  mostrarComponente3: boolean = false;
  mostrarComponente4: boolean = false;
  showAlert = false;
  tiempoA: number = 0;
  consumoA: number = 0;
  tiempoLuces: number[] = [0, 0, 0];
  consumos: number[] = [0, 0, 0];

  constructor(private service: SolicitudesAlarmaService, private serviceLuces: LucesTiempoService) {
  }

  ngOnInit(): void {
    this.service.getTime().subscribe((time) => {
      this.tiempoA = time;
      this.consumoA = ((this.tiempoA) / 3600) * 2.4;
      this.consumoA = parseFloat(this.consumoA.toFixed(4));
    });

    this.serviceLuces.getTime().subscribe((time) => {
      this.tiempoLuces = time;
      this.consumos = this.tiempoLuces.map((tiempo: number) => parseFloat((((tiempo) / 3600) * 1.2).toFixed(4)));


    });
  }

  cambiarVisibilidad() {
    this.mostrarComponente = !this.mostrarComponente;
  }

  cambiarVisibilidad2() {
    this.mostrarComponente2 = !this.mostrarComponente2;
  }

  cambiarVisibilidad3() {
    this.mostrarComponente3 = !this.mostrarComponente3;
  }

  cambiarVisibilidad4() {
    this.mostrarComponente4 = !this.mostrarComponente4;
  }
}
