import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActualizarInvitadoService {

  constructor(private http: HttpClient) {}

  postRequest(data: any): Observable<any>{
    return this.http.post('http://localhost:8081/invitado-actualizar/post', data);
  }

}
