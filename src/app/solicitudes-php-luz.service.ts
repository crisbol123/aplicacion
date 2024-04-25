import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SolicitudesPhpLuzService {

  constructor(private http: HttpClient) { }


  postRequest(data: any) {
    return this.http.post('http://localhost:8081/luces/actualizarEstado', data);
  }

  
  getRequest() {
    return this.http.get<any>('http://localhost:8081/luces/recibirEstado');
  }
}


