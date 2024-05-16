import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SolicitudesAlarmaService {
  private _alarmState$: BehaviorSubject<number>;

  constructor(private http: HttpClient) {
    this._alarmState$ = new BehaviorSubject<number>(0);

    this.getRequest().subscribe((data) => {
      this._alarmState$.next(data.estado_alarma);
    });

    this.startPolling();
  }

  private startPolling(): void {
    setInterval(() => {
      this.getRequest().subscribe((data) => {
        if (this._alarmState$.getValue() !== data.estado_alarma) {
          this._alarmState$.next(data.estado_alarma);
        }
      });
    }, 2000); 
  }

  postRequest(data: any) {
    return this.http.post('http://localhost:8081/alarma/actualizarEstadoAlarma', data);
  }
  postRequest2(data: any) {
    return this.http.post('http://localhost:8081/alarma/actualizarEnableAlarma', data);
  }

  getRequest() {
    return this.http.get<Alarma>('http://localhost:8081/alarma/recibirInfoAlarma');
  }

  getalarmState(): Observable<number> {
    return this._alarmState$.asObservable();
  }
}
export class Alarma{
  
  estado_alarma: any;
 enablee:any;
}



