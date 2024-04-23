import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
    
  
    userId: string='';
    password: string='';
    loginError: string = '';

    constructor(){}

    onSubmit(): void {
      // Aquí puedes agregar la lógica para manejar el envío del formulario
      // Por ahora, solo estableceremos el mensaje de error para demostración
      this.loginError = "hecho";
    
    }
    ngOnInit(): void {
      
    }
}
