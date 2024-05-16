import { Component, Input, OnInit } from '@angular/core';
import { SolicitudesAlarmaService } from '../solicitudes-alarma.service';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ConsultasAccesosService } from '../consultas-accesos.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-alarma',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alarma.component.html',
  styleUrl: './alarma.component.css'
})
export class AlarmaComponent implements OnInit  {
source='';
@Input() cedula: string ='';
@Input() permitido: boolean =false;
alarmaVisible:number = 1;
switchState: number = 1;
  alarma: Alarma = { estado_alarma: null, enable:false};

  constructor(private service: SolicitudesAlarmaService,private service2: ConsultasAccesosService) {
   

  }

  apagarAlarma(alarmaa:Alarma){
    
    console.log(alarmaa);
    if(alarmaa.estado_alarma== 1){ 
      alarmaa.estado_alarma=0;

    }
    const data = { estado: alarmaa.estado_alarma}; // Datos que quieres enviar en la solicitud
    this.service.postRequest(data).subscribe(response => {
    console.log(response);
});
}


ngOnInit(): void {
  
    this.service.getalarmState().subscribe((state) => {
      this.alarma.estado_alarma = state;
});

if(!this.permitido){
  this.service2.getRequest(this.cedula).subscribe(data => {
    console.log('accesos'); 
    console.log(data); 
  this.alarmaVisible=data.alarma;
  });
  }
  this.service.getRequest().subscribe(data => {
    console.log(data); 
  this.switchState= data.enablee;
  });




  
}
onSwitchChange(checked:boolean) {

  this.switchState = checked ? 1 : 0;
  const data = { enable: this.switchState};
  this.service.postRequest2(data).subscribe(response => {
    console.log(response);
});
}

}

export class Alarma{
estado_alarma: any;
enable:any;
}
