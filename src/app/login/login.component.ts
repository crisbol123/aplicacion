import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule ,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
    
  
    userId: string='';
    password: string='';
    loginError: boolean = false;
    errorLogin: string="k";

    constructor(private router: Router){}

    onSubmit(): void {
        // Aquí puedes agregar la lógica para manejar el envío del formulario
      // Por ahora, solo estableceremos el mensaje de error para demostración
      
      console.log('interfaz prin');
      this.loginError = true;
      this.errorLogin="Credenciales incorrectos. Por favor, inténtalo de nuevo.";
    }

    ngOnInit(): void {
      
    }
  }
    
