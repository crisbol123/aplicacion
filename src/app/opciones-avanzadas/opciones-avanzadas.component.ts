import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opciones-avanzadas',
  standalone: true,
  imports: [],
  templateUrl: './opciones-avanzadas.component.html',
  styleUrl: './opciones-avanzadas.component.css'
})
export class OpcionesAvanzadasComponent implements OnInit{
  textBoton: string = "Activado";
  botonInhabilitado: boolean = false;

  constructor(){}

  ngOnInit(): void {
  }

  //Hacer que la alarma se desactive y coloque el boton a inabilitado 

  estado() {
  }

}
