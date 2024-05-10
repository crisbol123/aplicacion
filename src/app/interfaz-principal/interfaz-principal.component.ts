import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucesComponent } from "../luces/luces.component";
import { BarraAdminLocalComponent } from "../barra-admin-local/barra-admin-local.component";
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlarmaComponent } from "../alarma/alarma.component";
import { PuertasComponent } from '../puertas/puertas.component';

@Component({
    selector: 'app-interfaz-principal',
    standalone: true,
    templateUrl: './interfaz-principal.component.html',
    styleUrl: './interfaz-principal.component.css',
    imports: [CommonModule, FormsModule, LucesComponent, BarraAdminLocalComponent, MatButtonModule, MatIconModule, AlarmaComponent,PuertasComponent]
})
export class InterfazPrincipalComponent {
  
mostrarComponente:boolean = false;
mostrarComponente2:boolean = false;
mostrarComponente3:boolean = false;
<<<<<<< HEAD
mostrarComponente4:boolean = false;
=======


>>>>>>> fa15f9cc4e515e71b19dfe7b3b4377e7be0a5bb3
cambiarVisibilidad(){

  this.mostrarComponente=!this.mostrarComponente;
}

cambiarVisibilidad2(){

  this.mostrarComponente2=!this.mostrarComponente2;
}
<<<<<<< HEAD
=======

>>>>>>> fa15f9cc4e515e71b19dfe7b3b4377e7be0a5bb3
cambiarVisibilidad3(){

  this.mostrarComponente3=!this.mostrarComponente3;
}
<<<<<<< HEAD
cambiarVisibilidad4(){

  this.mostrarComponente4=!this.mostrarComponente4;
}
=======

>>>>>>> fa15f9cc4e515e71b19dfe7b3b4377e7be0a5bb3
}
