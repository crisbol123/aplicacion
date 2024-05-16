import { Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,Router,RouterLink,RouterLinkActive} from '@angular/router';
import { ServicioBarraService } from '../servicio-barra.service';
import { routes } from '../app.routes';
import { SolicitudesAlarmaService } from '../solicitudes-alarma.service';
import { AlertService } from '../alert.service';

@Component({

  selector: 'app-barra-admin-local',

  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './barra-admin-local.component.html',
  styleUrl: './barra-admin-local.component.css'
})
export class BarraAdminLocalComponent implements OnInit {
  showAlert=false;
  @Input() action: string="";
  constructor(private obtenerEstado:  SolicitudesAlarmaService, private obtenerEstadoAlert:  AlertService, private router: Router){

  }
  
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

  showComponent(action: string): void {
    this.currentComponent = action;
  }
  logout(){
    this.router.navigate(['/login']);
  }
  
}
