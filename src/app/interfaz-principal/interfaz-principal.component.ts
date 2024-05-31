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
import { TiemposService } from '../tiempos.service';
import { ConsumosComponent } from "../consumos/consumos.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-interfaz-principal',
  standalone: true,
  templateUrl: './interfaz-principal.component.html',
  styleUrls: ['./interfaz-principal.component.css'],
  imports: [CommonModule, FormsModule, LucesComponent, BarraAdminLocalComponent, MatButtonModule, MatIconModule, AlarmaComponent, PuertasComponent, TemperaturaComponent, ConsumosComponent]
})
export class InterfazPrincipalComponent implements OnInit {

  mostrarComponente: boolean = false;
  mostrarComponente2: boolean = false;
  mostrarComponente3: boolean = false;
  mostrarComponente4: boolean = false;
  showAlert = false;
  consumos: Tiempos[] = [];
  tiempos: Tiempos[] = [];
  m = 1;
  mesSeleccionado = "";

  constructor(private serviceTiempos: TiemposService, private route: Router) { }

  ngOnInit(): void {
    this.serviceTiempos.getTiempos().subscribe((time) => {
      this.tiempos = time;
      this.consumos = this.tiempos.map(t => ({
        tluces: parseFloat(((t.tluces / 3600) * 0.24).toFixed(4)),
        tpuertas: parseFloat(((t.tpuertas / 3600) * 8.25).toFixed(4)),
        talarma: parseFloat(((t.talarma / 3600) * 2.4).toFixed(4)),
        tventilador: parseFloat(((t.tventilador / 3600) * 2.16).toFixed(4)),
        tesp: parseFloat(((t.tesp / 3600) * 0.4).toFixed(4))
      }));
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

interface Tiempos {
  tluces:number;
  tpuertas:number;
  talarma: number;
  tventilador: number;
  tesp: number;
}
