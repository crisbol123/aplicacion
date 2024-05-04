import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarInvitadoService {

  private backendUrl = 'http://localhost:8081/invitado-buscar/get'; // URL del backend

  constructor(private http: HttpClient) {}

  getRequest(): Observable<any> {
    return this.http.get(this.backendUrl);
  }
}
