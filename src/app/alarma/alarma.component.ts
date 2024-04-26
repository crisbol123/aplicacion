import { Component } from '@angular/core';
import { SolicitudesAlarmaService } from '../solicitudes-alarma.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-alarma',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alarma.component.html',
  styleUrl: './alarma.component.css'
})
export class AlarmaComponent {
source='';

  alarma: Alarma = { estado: null, fecha_estado: null };

  constructor(private service: SolicitudesAlarmaService) {
   

  }

  apagarAlarma(alarmaa:Alarma){
    
    console.log(alarmaa);
    if(alarmaa.estado== 1){ 
      alarmaa.estado=0;

    }
    const data = { estado: alarmaa.estado}; // Datos que quieres enviar en la solicitud
    this.service.postRequest(data).subscribe(response => {
    console.log(response);
});
}


ngOnInit(): void {
  

  this.service.getRequest().subscribe(data => {
   
    this.alarma= data;
    
    console.log( data); 
    console.log(this.alarma); 
    

});


  
}


}

export class Alarma{
  estado: any;
  fecha_estado:any;
}
