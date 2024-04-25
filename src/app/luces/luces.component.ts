import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-luces',
  standalone: true,
  imports: [],
  templateUrl: './luces.component.html',
  styleUrl: './luces.component.css'
})
export class LucesComponent implements OnInit {
  luces=[];
  
  source1 = '';
  source2 = '';
  source3 = '';
  estado1 =0;
  estado2 =0;
  estado3 =0;
  
  constructor(private http: HttpClient) {}


ngOnInit(): void {
  /*const data = { estado: 'valor1', id_bombillo: 'valor2' }; // Datos que quieres enviar en la solicitud
    this.http.post('http://localhost:8081/luces/actualizarEstado', data).subscribe(response => {
      console.log(response);*/

  this.http.get<any>('http://localhost:8081/luces/recibirEstado').subscribe(data => {
    console.log(data); 
data.data_rta.forEach((element: { id_bombillo: any; estado: string; })  => {
  switch(element.id_bombillo){
    case 1:
      if(element.estado == '1'){
        this.source1 ='https://png.pngtree.com/png-vector/20201208/ourlarge/pngtree-flat-light-bulb-turn-off-isolated-vector-png-image_2531328.jpg';
         }else{
  this.source1 ='https://www.shutterstock.com/image-vector/light-bulb-full-ideas-creative-260nw-1531484285.jpg';
         }
      break;
    case 2:
      if(element.estado == '1'){
        this.source2 ='https://png.pngtree.com/png-vector/20201208/ourlarge/pngtree-flat-light-bulb-turn-off-isolated-vector-png-image_2531328.jpg';
         }else{
  this.source2 ='https://www.shutterstock.com/image-vector/light-bulb-full-ideas-creative-260nw-1531484285.jpg';
         }
      break;
    case 3:
      if(element.estado == '1'){
        this.source3 ='https://png.pngtree.com/png-vector/20201208/ourlarge/pngtree-flat-light-bulb-turn-off-isolated-vector-png-image_2531328.jpg';
         }else{
  this.source3 ='https://www.shutterstock.com/image-vector/light-bulb-full-ideas-creative-260nw-1531484285.jpg';
         }
      break;
    default:
      console.log("El valor del id_bombillo no existe");
      break;
  
  }
});


   
  
  }
)
}
}



