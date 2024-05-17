import { Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,Router,RouterLink,RouterLinkActive} from '@angular/router';
import { ServicioBarraService } from '../servicio-barra.service';
import { routes } from '../app.routes';
import { SolicitudesAlarmaService } from '../solicitudes-alarma.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-crud-admin-global',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './crud-admin-global.component.html',
  styleUrl: './crud-admin-global.component.css'
})
export class CRUDAdminGlobalComponent implements OnInit {
  @Input() action: string="";
  showAlert=false;

  constructor(private obtenerEstado:SolicitudesAlarmaService,private obtenerEstadoAlert: AlertService,private miServicio:ServicioBarraService,private router: Router){}
  
  ngOnInit(): void {
   
    this.obtenerEstado.getalarmState().subscribe((state) => {
      if(state==1){
     
  this.obtenerEstadoAlert.showAlert();
      }
  
    });
  
      this.obtenerEstadoAlert.alert$.subscribe((res)=>
      {this.showAlert= true;
  
  setTimeout(() => {
    this.showAlert=false;
  }, 1000);
      
  });
     
  
  
  }


  currentComponent: string = "";
  Interfaz="";


  showComponent(action: string): void {
    this.currentComponent = action;
  }
  logout(){
    
    this.router.navigate(['/login']);
  }
  crear(){
    this.router.navigate(['/crear-admin-local'])
  }
  buscar(){

    this.router.navigate(['/read-admin-local'])
  }
  actualizar(){

    this.router.navigate(['/update-admin-local'])
  }
  eliminar(){

    this.router.navigate(['/delete-admin-local'])
  }
  
}
