import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiciosService {

  private backendUrl = 'http://localhost:8081/modo1/get'; // URL del backend
  private backendUrl1 = 'http://localhost:8081/modo1/get1';

  constructor(private http: HttpClient) {}

  getRequest(): Observable<any> {
    return this.http.get(this.backendUrl);
  }

  getRequest1(): Observable<any> {
    return this.http.get(this.backendUrl1);
  }

  postRequest(data: any): Observable<any>{
    return this.http.post('http://localhost:8081/modo1/post', data);
  }
}
