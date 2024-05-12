import { Component, OnInit } from '@angular/core';
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


}
export class local{
    cedula:any; 
    nombre:any; 
    contraseña:any; 
    numero: any;
    correo: any;
}