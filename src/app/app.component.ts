import { Component } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive, Router } from '@angular/router';
import { InterfazPrincipalComponent } from "./interfaz-principal/interfaz-principal.component";
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CRUDAdminGlobalComponent } from './crud-admin-global/crud-admin-global.component';
import { CrearAdminLocalComponent } from './crear-admin-local/crear-admin-local.component';
import { ReadAdminLocalComponent } from './read-admin-local/read-admin-local.component';
import { UpdateAdminLocalComponent } from './update-admin-local/update-admin-local.component';
import { DeleteAdminLocalComponent } from './delete-admin-local/delete-admin-local.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ServicioBarraService } from './servicio-barra.service';
import { Injectable } from '@angular/core';
import { SolicitudesPhpLuzService } from './solicitudes-php-luz.service';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet, RouterLink, RouterLinkActive,
      InterfazPrincipalComponent,
      LoginComponent,
      FormsModule,
      CRUDAdminGlobalComponent,CrearAdminLocalComponent,ReadAdminLocalComponent,
      UpdateAdminLocalComponent,DeleteAdminLocalComponent,CommonModule, HttpClientModule,
     
    ],
    providers: [SolicitudesPhpLuzService]
})
export class AppComponent {
  

  title = 'aplicacion';
  Interfaz:string = "Global";

  constructor(private miServicio:ServicioBarraService,private router: Router){
    this.Interfaz=this.miServicio.Interfaz;
  }
  getInterfaz():string{
    return this.miServicio.getInterfaz();
  }
  
  

}import { routes } from './app.routes';


