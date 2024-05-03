import { Component } from '@angular/core';
import { CRUDAdminGlobalComponent } from '../crud-admin-global/crud-admin-global.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-admin-local',
  standalone: true,
  imports: [CRUDAdminGlobalComponent],
  templateUrl: './read-admin-local.component.html',
  styleUrl: './read-admin-local.component.css'
})
export class ReadAdminLocalComponent {
  user = {
    cedula: '123',
    nombre: 'Carlos',
    contrasena: 'asdjkakjsd',
    numero: '312135',
    correo: 'asda@aisjd.com'
  };
  constructor(private router: Router){
  }
  logout(){
    
    this.router.navigate(['/login']);
  }


}
