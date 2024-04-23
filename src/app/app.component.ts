import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InterfazPrincipalComponent } from "./interfaz-principal/interfaz-principal.component";
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CRUDAdminGlobalComponent } from './crud-admin-global/crud-admin-global.component';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, InterfazPrincipalComponent,LoginComponent,FormsModule,CRUDAdminGlobalComponent]
})
export class AppComponent {
  title = 'aplicacion';
}
