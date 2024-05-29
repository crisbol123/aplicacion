import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraAdminLocalComponent } from '../barra-admin-local/barra-admin-local.component';
import { BuscarInvitadoService } from '../servicios/servicio-invitado-buscar/buscar-invitado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invitado-buscar',
  standalone: true,
  imports: [CommonModule, BarraAdminLocalComponent],
  templateUrl: './invitado-buscar.component.html',
  styleUrls: ['./invitado-buscar.component.css']
})
export class InvitadoBuscarComponent implements OnInit {
  users: any[] = [];
  selectedRowIndex: number | null = null;
  highlightedRowIndex: number | null = null;

  @Output() usuario = new EventEmitter<any>();
  @Output() cedula = new EventEmitter<any>();

  constructor(private service: BuscarInvitadoService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.service.getRequest().subscribe(
      (data: any) => {
        this.users = data.value;
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  selectRow(index: number): void {
    this.selectedRowIndex = index;
  }

  highlightRow(index: number): void {
    this.highlightedRowIndex = index;
  }

  removeHighlightRow(): void {
    this.highlightedRowIndex = null;
  }

  Actualizar(): void {
    if (this.selectedRowIndex !== null) {
      const datos = this.users[this.selectedRowIndex];
      const datosJson = JSON.stringify(datos);
      this.router.navigate(['/invitado-actualizar'], { queryParams: { datos: datosJson } });
    } else {
      console.log('No row selected');
    }
  }
  
  
  Eliminar(): void {
    if (this.selectedRowIndex !== null) {
      const cedula = this.users[this.selectedRowIndex].cedula;
      this.router.navigate(['/invitado-eliminar', cedula]);
    } else {
      console.log('No row selected');
    }
  }

  @HostListener('document:click', ['$event'])
  deselectRow(event: MouseEvent): void {
    if (!event.target || !(event.target as HTMLElement).closest('.table')) {
      this.selectedRowIndex = null;
    }
  }
}





