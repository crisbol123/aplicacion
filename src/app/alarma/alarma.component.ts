import { Component } from '@angular/core';
import { SolicitudesAlarmaService } from '../solicitudes-alarma.service';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ConsultasAccesosService } from '../consultas-accesos.service';
@Component({
  selector: 'app-alarma',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alarma.component.html',
  styleUrl: './alarma.component.css'
})
export class AlarmaComponent {
source='';

  alarma: Alarma = { estado_alarma: null };

  constructor(private service: SolicitudesAlarmaService) {
   

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


  
}


}

export class Alarma{
estado_alarma: any;

}
