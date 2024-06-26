import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuertasService {
  
  private backendUrl = 'http://localhost:8081/puertas/get'; // URL del backend

  constructor(private http: HttpClient) {}

  getRequest(): Observable<any> {
    return this.http.get(this.backendUrl);
  }

  postRequest(data: any): Observable<any>{
    return this.http.post('http://localhost:8081/puertas/post', data);
  }
}
