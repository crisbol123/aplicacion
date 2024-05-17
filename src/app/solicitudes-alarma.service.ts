import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SolicitudesAlarmaService {
  private _alarmState$: BehaviorSubject<number>;
  private tiempo_alarma$: BehaviorSubject<number>;

  constructor(private http: HttpClient) {
    this._alarmState$ = new BehaviorSubject<number>(0);
    this.tiempo_alarma$ = new BehaviorSubject<number>(0);

    this.getRequest().subscribe((data) => {
      this._alarmState$.next(data.estado_alarma);
      this.tiempo_alarma$.next(data.tiempoactivado);
    });

    this.startPolling();
  }

  private startPolling(): void {
    setInterval(() => {
      this.getRequest().subscribe((data) => {
        if (this._alarmState$.getValue() !== data.estado_alarma) {
          this._alarmState$.next(data.estado_alarma);
        }
        if (this.tiempo_alarma$ !== data.tiempoactivado) {
          this.tiempo_alarma$.next(data.tiempoactivado);
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
  getTime(): Observable<number> {
    return this.tiempo_alarma$.asObservable();
  }
}
export class Alarma{
  
  estado_alarma: any;
 enablee:any;
 tiempoactivado:any;
}



