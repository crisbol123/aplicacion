import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucesComponent } from "../luces/luces.component";
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlarmaComponent } from "../alarma/alarma.component";
import { PuertasComponent } from '../puertas/puertas.component';

import { BarraInvitadoComponent } from "../barra-invitado/barra-invitado.component";
import { ActivatedRoute } from '@angular/router';
import { ConsultasAccesosService } from '../consultas-accesos.service';

@Component({
    selector: 'app-interfaz-invitado',
    standalone: true,
    templateUrl: './interfaz-invitado.component.html',
    styleUrl: './interfaz-invitado.component.css',
 imports: [CommonModule, FormsModule, LucesComponent, MatButtonModule, MatIconModule, AlarmaComponent, PuertasComponent, BarraInvitadoComponent]

})
export class InterfazInvitadoComponent {
  luz1:number =0;
  luz2:number =0;
  luz3:number =0;
  puerta1:number =0;
  puerta2:number =0;
  puerta3:number =0;
  temperatura:number =0;
cedula:string= '';
  constructor(private route: ActivatedRoute, private service: ConsultasAccesosService) { }

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

ngOnInit(): void {
  this.cedula = this.route.snapshot.queryParams['cedula'];
  console.log(this.cedula);

  this.service.getRequest(this.cedula).subscribe(data => {
    console.log(data); 
    this.luz1=data.luz1;
    this.luz2=data.luz2;
    this.luz3=data.luz3;
    
    this.puerta1=data.puerta1;
    this.puerta2=data.puerta2;
    this.puerta3=data.puerta3;
    this.temperatura=data.temperatura;
});
  
}
}
