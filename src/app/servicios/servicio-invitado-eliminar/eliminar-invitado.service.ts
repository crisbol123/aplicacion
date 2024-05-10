import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EliminarInvitadoService {

  constructor(private http: HttpClient) {}

  postRequest(data: any): Observable<any>{
    return this.http.post('http://localhost:8081/invitado-eliminar/post', data);
  }

}
