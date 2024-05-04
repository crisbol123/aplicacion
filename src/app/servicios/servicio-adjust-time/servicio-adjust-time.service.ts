import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioAdjustTimeService {

  private backendUrl = 'http://localhost:8081/adjust-time/get'; // URL del backend

  constructor(private http: HttpClient) {}

  getRequest(): Observable<any> {
    return this.http.get(this.backendUrl);
  }

  postRequest(data: any): Observable<any>{
    return this.http.post('http://localhost:8081/adjust-time/post', data);
  }
}
