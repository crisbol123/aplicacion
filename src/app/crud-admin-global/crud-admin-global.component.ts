import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,Router } from '@angular/router';


@Component({
  selector: 'app-crud-admin-global',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './crud-admin-global.component.html',
  styleUrl: './crud-admin-global.component.css'
})


export class CRUDAdminGlobalComponent {
  @Input() action: string="";
  constructor(private router: Router) { }
  currentComponent: string = "";
  logout() {
    // Navegar a la componente "Login"
    this.router.navigate(['/login']);
  }

  showComponent(action: string): void {
    this.currentComponent = action;
  }
}
