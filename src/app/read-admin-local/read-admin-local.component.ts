import { Component, HostListener, OnInit, Output, EventEmitter } from '@angular/core';
import { CRUDAdminGlobalComponent } from '../crud-admin-global/crud-admin-global.component';
import { Router } from '@angular/router';
import { CrudGlobalService } from '../servicios/crud-global.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-read-admin-local',
  standalone: true,
  imports: [CRUDAdminGlobalComponent,CommonModule],
  templateUrl: './read-admin-local.component.html',
  styleUrl: './read-admin-local.component.css'
})
export class ReadAdminLocalComponent implements OnInit{

  locales:local[]=[];
  selectedRowIndex: number | null = null;
  highlightedRowIndex: number | null = null;

  @Output() usuario = new EventEmitter<any>();
  @Output() cedula = new EventEmitter<any>();
  
  ngOnInit(): void {
      this.service.buscar().subscribe(data => {
      console.log(data); 
      this.locales= data;
      });
  }

  constructor(private router: Router,private service: CrudGlobalService){
  }
  logout(){
    this.router.navigate(['/login']);
  }

  Actualizar(): void {
    if (this.selectedRowIndex !== null) {
      const datos = this.locales[this.selectedRowIndex];
      const datosJson = JSON.stringify(datos);
      this.router.navigate(['/update-admin-local'], { queryParams: { datos: datosJson } });
    } else {
      console.log('No row selected');
    }
  }

  Eliminar(): void {
    if (this.selectedRowIndex !== null) {
      const cedula = this.locales[this.selectedRowIndex].cedula;
      console.log(cedula);
      this.router.navigate(['/delete-admin-local', cedula]);
    } else {
      console.log('No row selected');
    }
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

  @HostListener('document:click', ['$event'])
  deselectRow(event: MouseEvent): void {
    if (!event.target || !(event.target as HTMLElement).closest('.table')) {
      this.selectedRowIndex = null;
    }
  }


}
export class local{
    cedula:any; 
    nombre:any; 
    contraseña:any; 
    numero: any;
    correo: any;
}