import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí

import { Component } from '@angular/core';

@Component({
  selector: 'app-temperatura',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './temperatura.component.html',
  styleUrl: './temperatura.component.css'
})
export class TemperaturaComponent {
  currentTemperature: number = 25; // Temperatura actual del ambiente
  desiredTemperature: number = 20; // Temperatura deseada del aire acondicionado
  isACOn: boolean = false; // Estado del aire acondicionado (encendido/apagado)
  constructor(){};



  toggleAC(): void {
    this.isACOn = !this.isACOn;
  }

}
