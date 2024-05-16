import { Component, OnInit } from '@angular/core';
import { PuertasService } from '../servicios/servicio-puertas/puertas.service';
import { ConsultasAccesosService } from '../consultas-accesos.service';
import { Input } from '@angular/core';
@Component({
  selector: 'app-puertas',
  standalone: true,
  imports: [],
  templateUrl: './puertas.component.html',
  styleUrl: './puertas.component.css'
})
export class PuertasComponent implements OnInit{

  @Input() permitido: boolean =false;
  puerta1:number =1;
  puerta2:number =1;
  puerta3:number =1;
  @Input() cedula: string ='';

  estadoPuerta1: number = 0;
  estadoPuerta2: number = 0;
  estadoPuerta3: number = 0;
  textBoton1: string = '';
  textBoton2: string = '';
  textBoton3: string = '';
  

  constructor(private service: PuertasService, private service2: ConsultasAccesosService) {}

  ngOnInit(): void {
    this.getData();

    if(!this.permitido){

      this.service2.getRequest(this.cedula).subscribe(data => {
        console.log('accesos'); 
        console.log(data); 
        this.puerta1=data.puerta1;
        this.puerta2=data.puerta2;
        this.puerta3=data.puerta3;
        
      }
      );
    }
  }

  getData(): void {
    this.service.getRequest().subscribe(
      (data: any[]) => {
        this.estadoPuerta1 = data[0].estado;
        this.estadoPuerta2 = data[1].estado;
        this.estadoPuerta3 = data[2].estado;
        console.log(this.estadoPuerta1);
        console.log(this.estadoPuerta2);
        console.log(this.estadoPuerta3);
        this.actualizarTextoBoton();
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  togglePuerta(idPuerta: number): void {
    switch(idPuerta) {
      case 1:
        this.estadoPuerta1 = this.estadoPuerta1 === 0 ? 90 : 0;
        break;
      case 2:
        this.estadoPuerta2 = this.estadoPuerta2 === 0 ? 90 : 0;
        break;
      case 3:
        this.estadoPuerta3 = this.estadoPuerta3 === 0 ? 90 : 0;
        break;
      default:
        break;
    }
    this.postData();
  }

  postData(): void {
    const datos = [
      { id: 1, estado: this.estadoPuerta1 },
      { id: 2, estado: this.estadoPuerta2 },
      { id: 3, estado: this.estadoPuerta3 }
    ];
    console.log("Datos");
    this.service.postRequest(datos).subscribe(
      () => {
        console.log('Datos de puertas actualizados correctamente');
        this.getData(); // Actualizar datos después del envío exitoso
      },
      (error) => {
        console.error('Error al enviar datos:', error);
      }
    );
  }

  actualizarTextoBoton(): void {
    if (this.estadoPuerta1 == 0) {
      this.textBoton1 = 'Abrir';
    } else {
      this.textBoton1 = 'Cerrar';
    }

    if (this.estadoPuerta2 == 0) {
      this.textBoton2 = 'Abrir';
    } else {
      this.textBoton2 = 'Cerrar';
    }

    if (this.estadoPuerta3 == 0) {
      this.textBoton3 = 'Abrir';
    } else {
      this.textBoton3 = 'Cerrar';
    }
  
  


    
}}