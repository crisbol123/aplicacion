import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule ,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
    
  
    userId: string='';
    password: string='';
    loginError: boolean = false;
    errorLogin: string='';

    constructor(){}

    onSubmit(event: Event): void {
      event.preventDefault();
        // Aquí puedes agregar la lógica para manejar el envío del formulario
      // Por ahora, solo estableceremos el mensaje de error para demostración
      this.loginError = true;
      this.errorLogin="Credenciales incorrectos. Por favor, inténtalo de nuevo.";
      
      
    
    }
  }
    
