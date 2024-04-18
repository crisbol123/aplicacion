import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InterfazPrincipalComponent } from "./interfaz-principal/interfaz-principal.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, InterfazPrincipalComponent]
})
export class AppComponent {
  title = 'aplicacion';
}
