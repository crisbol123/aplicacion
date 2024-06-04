import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiciosService {

  private backendUrl = 'http://localhost:8081/modo1/get'; // URL del backend


  constructor(private http: HttpClient) {}

  getRequest(): Observable<any> {
    return this.http.get(this.backendUrl);
  }
  getRequest3(): Observable<any> {
    return this.http.get('http://localhost:8081/modo2/get');
  }

  postRequest(data: any): Observable<any>{
    return this.http.post('http://localhost:8081/modo1/post', data);
  }
  postRequest2(data: any): Observable<any>{
    return this.http.post('http://localhost:8081/modo1/postModo0', data);
  }
  postRequest3(data: any): Observable<any>{
    return this.http.post('http://localhost:8081/modo2/post', data);
  }
}
