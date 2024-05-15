import { NgModule, OnInit, Input} from '@angular/core';

import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí

import { Component } from '@angular/core';
import { TemperaturaService } from '../servicios/temperatura.service';
import { blob } from 'stream/consumers';
import { ConsultasAccesosService } from '../consultas-accesos.service';

@Component({
  selector: 'app-temperatura',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './temperatura.component.html',
  styleUrl: './temperatura.component.css'
})
export class TemperaturaComponent implements  OnInit{

  @Input() permitido: boolean = false;
  @Input() cedula: string ='';
  
  temp= {
    temp_Real:'',
    Ref:'',
    enablee: ''
  };
  currentTemperature: number = 25; // Temperatura actual del ambiente
  desiredTemperature: number = 20; // Temperatura deseada del aire acondicionado
  isACOn: boolean = false; // Estado del aire acondicionado (encendido/apagado)
  
  accesoInv:boolean = false;
  switchState: boolean = true;
  isDisabled: boolean = false; // Puedes inicializarla según sea necesario

  constructor(private service: TemperaturaService, private service2: ConsultasAccesosService){}
  ngOnInit(): void {
    //Asignar Valores iniciales
    this.service.get_data().subscribe(data => {
      console.log(data); 
      this.switchState= data.enablee;
      this.isDisabled=!this.switchState;
      this.currentTemperature= data.valormedido;
      this.desiredTemperature=data.referencia;
    });
    if(!this.permitido){
      this.service2.getRequest(this.cedula).subscribe(data => {
        if(data.temperatura==0){
          this.accesoInv=true;
          this.isDisabled = true;
        }
      });
    }
    
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
    const datos={ referencia: this.desiredTemperature, enablee: enable2}
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
