import { Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,Router,RouterLink,RouterLinkActive} from '@angular/router';
import { ServicioBarraService } from '../servicio-barra.service';
import { routes } from '../app.routes';


@Component({
  selector: 'app-crud-admin-global',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './crud-admin-global.component.html',
  styleUrl: './crud-admin-global.component.css'
})
export class CRUDAdminGlobalComponent implements OnInit {
  @Input() action: string="";

  constructor(private miServicio:ServicioBarraService,private router: Router){}
  ngOnInit(): void {
    
  }

  currentComponent: string = "";
  Interfaz="";


  showComponent(action: string): void {
    this.currentComponent = action;
  }
  logout(){
    
    this.router.navigate(['/login']);
  }
  
}
