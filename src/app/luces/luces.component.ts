import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-luces',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './luces.component.html',
  styleUrl: './luces.component.css'
})

export class LucesComponent implements OnInit {
  
  luces:Luz[]=[];
  
  source1 = '';
  source2 = '';
  source3 = '';
  estado1 =0;
  estado2 =0;
  estado3 =0;
  
  constructor(private http: HttpClient) {}

  cambiarEstado(luzo:Luz){
      console.log(luzo);
      luzo.estado=!luzo.estado;
      const data = { estado: luzo.estado, id_bombillo: luzo.id_bombillo }; // Datos que quieres enviar en la solicitud
    this.http.post('http://localhost:8081/luces/actualizarEstado', data).subscribe(response => {
      console.log(response);
  });
  }

ngOnInit(): void {
  

  this.http.get<any>('http://localhost:8081/luces/recibirEstado').subscribe(data => {
    console.log(data); 
    this.luces= data;
});
  
}
}

export class Luz{
  id_bombillo:any;
  estado: any;
  fecha_estado:any;
}



