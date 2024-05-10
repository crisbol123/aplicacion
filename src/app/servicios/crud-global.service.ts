import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudGlobalService {

  constructor(private http: HttpClient) { }


  crear(data: any) {
    return this.http.post('http://localhost:8081/crud-global/crear-admin-local', data);
  }
  actualizar(data: any) {
    return this.http.post('http://localhost:8081/crud-global/actualizar', data);
  }
  eliminar(data: any) {
    return this.http.post('http://localhost:8081/crud-global/eliminar', data);
  }
  buscar() {
    return this.http.get<any>('http://localhost:8081/crud-global/buscar');
  }
}
