import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearInvitadoService {

  constructor(private http: HttpClient) {}

  postRequest(data: any): Observable<any>{
    return this.http.post('http://localhost:8081/invitado-crear/post', data);
  }
}
