import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucesComponent } from "../luces/luces.component";

@Component({
    selector: 'app-interfaz-principal',
    standalone: true,
    templateUrl: './interfaz-principal.component.html',
    styleUrl: './interfaz-principal.component.css',
    imports: [CommonModule, FormsModule, LucesComponent]
})
export class InterfazPrincipalComponent {
mostrarComponente:boolean = false;

cambiarVisibilidad(){

  this.mostrarComponente=!this.mostrarComponente;
}
}
