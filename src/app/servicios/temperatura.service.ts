import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TemperaturaService {

  constructor(private http: HttpClient) { }

  getTemperaturaPeriodicamente(): Observable<any> {
    return interval(2000).pipe(
      switchMap(() => this.http.get<any>('http://localhost:8081/temp/get-data'))
    );
  }

  update_data(data:any) {
    return this.http.post('http://localhost:8081/temp/update-data', data );
  }
  get_data() {
    return this.http.get<any>('http://localhost:8081/temp/get-data');
  }
}
