import { Component, OnInit } from '@angular/core';
import { BarraAdminLocalComponent } from '../barra-admin-local/barra-admin-local.component';
import { FormsModule } from '@angular/forms';
import { ServicioAdjustTimeService } from '../servicios/servicio-adjust-time/servicio-adjust-time.service';

@Component({
  selector: 'app-adjust-time',
  standalone: true,
  imports: [BarraAdminLocalComponent,FormsModule],
  templateUrl: './adjust-time.component.html',
  styleUrl: './adjust-time.component.css'
})
export class AdjustTimeComponent implements OnInit{
  subidaValue: number = 0;
  bajadaValue: number = 0;


  constructor(private service: ServicioAdjustTimeService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.service.getRequest().subscribe(
      (data) => {
        this.subidaValue = data.columna1/1000;
        this.bajadaValue = data.columna2/1000;
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  ajustarValores() {
    //console.log("Subida:", this.subidaValue, "ms, Bajada:", this.bajadaValue, "ms");
    // Aquí puedes enviar los datos a donde sea necesario
    this.postData();
  }

  postData(): void {

    const datos = { 
      columna1: this.subidaValue*1000,
      columna2: this.bajadaValue*1000
     };

    this.service.postRequest(datos).subscribe(
      () => {
        console.log(datos);
      },
      (error) => {
        console.log('Error al enviar datos:', error);
      }
    );
  }

}
