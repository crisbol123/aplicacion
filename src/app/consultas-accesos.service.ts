import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConsultasAccesosService {

  


  constructor(private http: HttpClient) {

  }


 postRequest(data: any) {
   return this.http.post('http://localhost:8081/modos/actualizarEstado', data);
 }

 
 getRequest(cedulaa: string) {
   return this.http.get<any>('http://localhost:8081/accesos/recibirAccesos?cedula='+cedulaa);
 }

}
