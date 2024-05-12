import { Component,OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet,Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';

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
    formSubmitted: boolean=false;

    constructor(private router: Router,private service: LoginService){}
    @ViewChild('loginForm', { static: false }) loginForm!: NgForm;
    user= {
      cedula:'',
      contrasena:''
    };
   
    onSubmit(): void {
      this.formSubmitted=true;
        // Aquí puedes agregar la lógica para manejar el envío del formulario
      // Por ahora, solo estableceremos el mensaje de error para demostración
      if (this.loginForm.valid) {

        const credenciales = { cedula: this.user.cedula, contraseña: this.user.contrasena}
        this.service.login(credenciales).subscribe((response:any) => {
          // Aquí puedes acceder al cuerpo de la respuesta
          console.log('Respuesta del servidor:', response.tipo);
          
          // Dependiendo de lo que necesites hacer con la respuesta, puedes tomar acciones en función de su contenido
          if (response.tipo == 'global') {
            //this.loginError = true;
            //this.errorLogin="global";
            this.Global();
            // Hacer algo si el usuario es global
          } else if (response.tipo == 'local') {
            //this.loginError = true;
            //this.errorLogin="local";
            this.Local();
            // Hacer algo si el usuario es local
          } else if (response.tipo =='invitado') {
            //this.loginError = true;
            //this.errorLogin="invitado";
            this.Invitado(this.user.cedula);
            // Hacer algo si el usuario es invitado
          } 
        },(error)=>{
            this.loginError = true;
            this.errorLogin="Credenciales incorrectos";
        })

        console.log('interfaz prin');
        
      }  
       
    }

    
    Global(){
      this.router.navigate(['/crear-admin-local']);
    }
    Local(){
      this.router.navigate(['/interfaz-principal']);
    }

    Invitado(id: any){
      this.router.navigate(['/interfaz-invitado'], { queryParams: { cedula: id } });
    }

    ngOnInit(): void {
      
    }
  }

  
