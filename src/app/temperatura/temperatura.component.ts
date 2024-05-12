import { NgModule, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí

import { Component } from '@angular/core';
import { TemperaturaService } from '../servicios/temperatura.service';
import { blob } from 'stream/consumers';

@Component({
  selector: 'app-temperatura',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './temperatura.component.html',
  styleUrl: './temperatura.component.css'
})
export class TemperaturaComponent implements  OnInit{
  temp= {
    temp_Real:'',
    Ref:'',
    enable: ''
  };
  currentTemperature: number = 25; // Temperatura actual del ambiente
  desiredTemperature: number = 20; // Temperatura deseada del aire acondicionado
  isACOn: boolean = false; // Estado del aire acondicionado (encendido/apagado)
  
  
  switchState: boolean = true;
  isDisabled: boolean = false; // Puedes inicializarla según sea necesario

  constructor(private service: TemperaturaService){}
  ngOnInit(): void {
    //Asignar Valores iniciales
    this.service.get_data().subscribe(data => {
      console.log(data); 
      this.switchState= data.enable;
      this.isDisabled=!this.switchState;
      this.currentTemperature= data.valormedido;
      this.desiredTemperature=data.referencia;
    });

    
    this.service.getTemperaturaPeriodicamente().subscribe(data => {
      //console.log(data);
      this.currentTemperature = data.valormedido;
    });   
  }

  onSwitchChange() {
    //console.log('Estado del switch cambiado:', this.switchState);
    this.isDisabled = !this.isDisabled;
    this.onTemperatureChange();
  }

  onTemperatureChange(): void {
    var enable2;
    if(this.switchState){
      enable2='1';
    }else{
      enable2='0';
    }
    const datos={ referencia: this.desiredTemperature, enable: enable2}
    this.service.update_data(datos).subscribe(
      (response) => {
        //console.log(response); 
      },
      (error) => {
        console.log("error"); 
      }
    );
  }



  toggleAC(): void {
    this.isACOn = !this.isACOn;
  }

}
