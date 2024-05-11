import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucesComponent } from "../luces/luces.component";
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlarmaComponent } from "../alarma/alarma.component";
import { PuertasComponent } from '../puertas/puertas.component';
import { BarraInvitadoComponent } from '../barra-invitado/barra-invitado.component';

@Component({
    selector: 'app-interfaz-invitado',
    standalone: true,
    templateUrl: './interfaz-invitado.component.html',
    styleUrl: './interfaz-invitado.component.css',
    imports: [CommonModule, FormsModule, LucesComponent, MatButtonModule, MatIconModule, AlarmaComponent,PuertasComponent,BarraInvitadoComponent]
})
export class InterfazInvitadoComponent {
  
mostrarComponente:boolean = false;
mostrarComponente2:boolean = false;
mostrarComponente3:boolean = false;
mostrarComponente4:boolean = false;

cambiarVisibilidad(){

  this.mostrarComponente=!this.mostrarComponente;
}

cambiarVisibilidad2(){

  this.mostrarComponente2=!this.mostrarComponente2;
}
cambiarVisibilidad3(){

  this.mostrarComponente3=!this.mostrarComponente3;
}
cambiarVisibilidad4(){

  this.mostrarComponente4=!this.mostrarComponente4;
}
}
