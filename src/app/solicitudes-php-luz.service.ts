import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SolicitudesPhpLuzService {

  constructor(private http: HttpClient) {

    this.getRequest();
    // Llama a loadData() cada 5 segundos
    setInterval(() => this.getRequest(), 5000);
   }


  postRequest(data: any) {
    return this.http.post('http://localhost:8081/luces/actualizarEstado', data);
  }

  
  getRequest() {
    return this.http.get<any>('http://localhost:8081/luces/recibirEstado');
  }

  
}


