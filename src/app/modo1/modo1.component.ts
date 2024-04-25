import { Component } from '@angular/core';
import { BarraAdminLocalComponent } from '../barra-admin-local/barra-admin-local.component';

@Component({
  selector: 'app-modo1',
  standalone: true,
  imports: [BarraAdminLocalComponent],
  templateUrl: './modo1.component.html',
  styleUrl: './modo1.component.css'
})
export class Modo1Component {
  respuesta: any;
  textBoton: string = "Activado";
  botonInhabilitado: boolean = false;

  constructor(){}

  ngOnInit(): void {
    //this.getData();
    /*if(this.respuesta == "Desactivada"){
      this.botonInhabilitado = true;
      this.textBoton = "Inhabilitado";
    }*/
  }
/*
  getData(): void{
    this.dataService.obtenerMensaje().subscribe(
      (data) => {
        this.respuesta = data.ultimoValor;
        console.log(typeof this.respuesta);
      },(error) => {
        console.error('Motherfucker',error);
      }
    );
  }*/

  
  desactivarAlarma() {
    if(this.textBoton == "Activado"){
      this.textBoton = "Desactivado"
    }else{
      if(this.textBoton == "Desactivado"){
        this.textBoton = "Activado";
      }
      
    }
    /*
    const datos = { estado: 'Desactivada' };
    console.log(datos);
    

    this.postServie.postearDatos(datos).subscribe(response =>{
      console.log("Envio: ",response);
      this.boton();
    },error => {
      console.log("Error al enviar datos",error);
    }
  );
  //Hacer que la alarma se desactive y coloque el boton a inabilitado */
  }


  boton() {
    this.textBoton = "Inhabilitado";
    this.botonInhabilitado = true; 
    console.log("Desactivo la alarma");
  }
}
