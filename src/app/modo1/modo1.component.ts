import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios/servicio-modo1/servicios.service';
import { BarraAdminLocalComponent } from '../barra-admin-local/barra-admin-local.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modo1',
  standalone: true,
  imports: [BarraAdminLocalComponent, CommonModule, FormsModule],
  templateUrl: './modo1.component.html',
  styleUrls: ['./modo1.component.css']
})
export class Modo1Component implements OnInit {
  respuesta: any;
  textBoton: string = '';
  estado: number = 0; // Inicialmente establecido en 0 para activar

  constructor(private service: ServiciosService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.service.getRequest().subscribe(
      (data) => {
        this.respuesta = data.value;
        this.estado = this.respuesta; // Sincroniza el estado local con el del servidor
        this.actualizarTextoBoton();
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  postData(): void {
    const datos = { estado: this.estado };

    this.service.postRequest(datos).subscribe(
      () => {
        // Actualiza el texto del botón después de una solicitud exitosa
        this.actualizarTextoBoton();
      },
      (error) => {
        console.log('Error al enviar datos:', error);
      }
    );
  }

  boton(): void {
    this.estado = this.estado == 0 ? 2 : 0; // Cambiar entre 0 y 1
    this.postData();
  }

  actualizarTextoBoton(): void {
    this.textBoton = this.estado === 2 ? 'Desactivar' : 'Activar';
  }
}
