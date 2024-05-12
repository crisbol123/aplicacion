import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicioBarraService } from '../servicio-barra.service';
import { RouterOutlet,Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule ,CommonModule,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
    
  
    userId: string='';
    password: string='';
    loginError: boolean = false;
    errorLogin: string="k";

    
    constructor(private miServicio:ServicioBarraService,private router: Router){}
    onSubmit(): void {
        // Aquí puedes agregar la lógica para manejar el envío del formulario
      // Por ahora, solo estableceremos el mensaje de error para demostración
      
      console.log('interfaz prin');
      this.loginError = true;
      this.errorLogin="Credenciales incorrectos. Por favor, inténtalo de nuevo.";
    }
    Global(){
      this.router.navigate(['/crear-admin-local']);
    }
    Local(){
      this.router.navigate(['/interfaz-principal']);
    }

    Invitado(){
      this.router.navigate(['/interfaz-invitado'], { queryParams: { cedula: '1004423712' } });
    }

    ngOnInit(): void {
      
    }
  }
    
