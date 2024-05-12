import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { SolicitudesPhpLuzService } from '../solicitudes-php-luz.service';
import { CommonModule } from '@angular/common';
import { ConsultasAccesosService } from '../consultas-accesos.service';
import { Input } from '@angular/core';
@Component({
  selector: 'app-luces',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './luces.component.html',
  styleUrl: './luces.component.css'
  })



export class LucesComponent implements OnInit {
  luz1:number =1;
  luz2:number =1;
  luz3:number =1;
  @Input() cedula: string ='';
  @Input() permitido: boolean =false;


  luces:Luz[]=[];
  
  source1 = '';
  source2 = '';
  source3 = '';
  estado1 =0;
  estado2 =0;
  estado3 =0;
  
  constructor(private service: SolicitudesPhpLuzService,private service2: ConsultasAccesosService) {}

  cambiarEstado(luzo:Luz){
    
      console.log(luzo);
      luzo.estadoluces=!luzo.estadoluces;
      const data = { estado: luzo.estadoluces, id_bombillo: luzo.id_bombillo }; // Datos que quieres enviar en la solicitud
      this.service.postRequest(data).subscribe(response => {
      console.log(response);
  });
  }

ngOnInit(): void {
  

  this.service.getRequest().subscribe(data => {
    console.log('luces'); 
    console.log(data); 
    this.luces= data;
});
if(!this.permitido){
this.service2.getRequest(this.cedula).subscribe(data => {
  console.log('accesos'); 
  console.log(data); 
  this.luz1=data.luz1;
  this.luz2=data.luz2;
  this.luz3=data.luz3;
  
  
});
}
}
}

export class Luz{
  id_bombillo:any;
  estadoluces: any;
  fecha_estado:any;
}



