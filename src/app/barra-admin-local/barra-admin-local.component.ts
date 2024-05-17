import { Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,Router,RouterLink,RouterLinkActive} from '@angular/router';
import { ServicioBarraService } from '../servicio-barra.service';
import { routes } from '../app.routes';
import { TemperaturaService } from '../servicios/temperatura.service';
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
  @Input() action: string="";
  currentComponent="";
  currentTemperature: number=0;
showAlert= false;
  constructor(private obtenerEstado:SolicitudesAlarmaService,private obtenerEstadoAlert: AlertService, private miServicio:ServicioBarraService,private router: Router){}
  
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
  }, 3000);
      
  });
     
    
  }

  

  showComponent(action: string): void {
    this.currentComponent = action;
  }
  logout(){
    this.router.navigate(['/login']);
  }
  crear(){
    this.router.navigate(['/invitado-crear'])
  }
  buscar(){

    this.router.navigate(['invitado-buscar'])
  }
  actualizar(){

    this.router.navigate(['/invitado-actualizar'])
  }
  eliminar(){

    this.router.navigate(['/invitado-eliminar'])
  }
  home(){

    this.router.navigate(['/interfaz-principal'])
  }
  modos(){

    this.router.navigate(['./modo1']);
  }
  velocidades(){

    this.router.navigate(['/adjust-time'])
  }
  

}
