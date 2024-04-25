import { Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,Router,RouterLink,RouterLinkActive} from '@angular/router';
import { ServicioBarraService } from '../servicio-barra.service';
import { routes } from '../app.routes';


@Component({
  selector: 'app-admin-local',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './barra-admin-local.component.html',
  styleUrl: './barra-admin-local.component.css'
})
export class BarraAdminLocalComponent implements OnInit {
  @Input() action: string="";

  constructor(private miServicio:ServicioBarraService,private router: Router){}
  ngOnInit(): void {
    
  }

  currentComponent: string = "";

  showComponent(action: string): void {
    this.currentComponent = action;
  }
  logout(){
    
    this.router.navigate(['/login']);
  }
  
}
