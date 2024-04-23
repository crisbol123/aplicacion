import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InterfazPrincipalComponent } from "./interfaz-principal/interfaz-principal.component";
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, InterfazPrincipalComponent,LoginComponent]
})
export class AppComponent {
  title = 'aplicacion';
}
