import { Component, OnInit } from '@angular/core';
import { PuertasService } from '../servicios/puertas.service';

@Component({
  selector: 'app-puertas',
  standalone: true,
  imports: [],
  templateUrl: './puertas.component.html',
  styleUrl: './puertas.component.css'
})
export class PuertasComponent implements OnInit {
  
  luces:Luz[]=[];
  
  source1 = '';
  source2 = '';
  source3 = '';
  estado1 =0;
  estado2 =0;
  estado3 =0;
  
  constructor(private service: PuertasService) {}

  cambiarEstado(luzo:Luz){
    
      console.log(luzo);
      luzo.estado=!luzo.estado;
      const data = { estado: luzo.estado, id_bombillo: luzo.id_bombillo }; // Datos que quieres enviar en la solicitud
      this.service.postRequest(data).subscribe(response => {
      console.log(response);
  });
  }

ngOnInit(): void {
  

  this.service.getRequest().subscribe(data => {
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