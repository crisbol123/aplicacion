import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios/servicios.service';
import { BarraAdminLocalComponent } from '../barra-admin-local/barra-admin-local.component';

@Component({
  selector: 'app-modo1',
  standalone: true,
  imports: [BarraAdminLocalComponent],
  templateUrl: './modo1.component.html',
  styleUrl: './modo1.component.css'
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
        this.respuesta = data.ultimoValor;
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
      },
      (error) => {
        console.log('Error al enviar datos:', error);
      }
    );
  }

  boton(): void {
    this.estado = this.estado == 0 ? 1 : 0; // Cambiar entre 0 y 1
    this.postData();
    this.getData();
  }

  actualizarTextoBoton(): void {
    if (this.respuesta == 1) {
      this.textBoton = 'Desactivar';
    } else {
      this.textBoton = 'Activar';
    }
  
  }
  
}

