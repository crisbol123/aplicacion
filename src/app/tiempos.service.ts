import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiemposService {

  private tiempos$: BehaviorSubject<Tiempos[]>;

  constructor(private http: HttpClient) {
    this.tiempos$ = new BehaviorSubject<Tiempos[]>([
      { luces:0, puertas:0, alarma: 0, ventilador: 0, esp: 0 },
      { luces:0, puertas:0,  alarma: 0, ventilador: 0, esp: 0 },
      { luces:0, puertas:0, alarma: 0, ventilador: 0, esp: 0 },
      { luces:0, puertas:0, alarma: 0, ventilador: 0, esp: 0 },
      { luces:0, puertas:0, alarma: 0, ventilador: 0, esp: 0 },
      { luces:0, puertas:0, alarma: 0, ventilador: 0, esp: 0 },
      { luces:0, puertas:0, alarma: 0, ventilador: 0, esp: 0 },
      { luces:0, puertas:0, alarma: 0, ventilador: 0, esp: 0 },
      { luces:0, puertas:0, alarma: 0, ventilador: 0, esp: 0 },
      { luces:0, puertas:0, alarma: 0, ventilador: 0, esp: 0 },
      {luces:0, puertas:0, alarma: 0, ventilador: 0, esp: 0 },
      {luces:0, puertas:0, alarma: 0, ventilador: 0, esp: 0 }
    ]);

    this.getRequest().subscribe((data) => {
      this.tiempos$.next(data);
    });

    this.startPolling();
  }

  private startPolling(): void {
    setInterval(() => {
      this.getRequest().subscribe((data) => {
        if (!this.arraysEqual(this.tiempos$.value, data)) {
          this.tiempos$.next(data);
        }
      });
    }, 2000);
  }

  private arraysEqual(arr1: Tiempos[], arr2: Tiempos[]): boolean {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (!this.tiemposEqual(arr1[i], arr2[i])) return false;
    }
    return true;
  }

  private tiemposEqual(t1: Tiempos, t2: Tiempos): boolean {
    return t1.luces === t2.luces &&
           t1.puertas === t2.puertas &&
           t1.alarma === t2.alarma &&
           t1.ventilador === t2.ventilador &&
           t1.esp === t2.esp;
  }

  getRequest(): Observable<Tiempos[]> {
    return this.http.get<Tiempos[]>('http://localhost:8081/tiempos/recibirTiempos');
  }
  getTiempos(): Observable<Tiempos[]> {
    return this.tiempos$.asObservable();
  }
}

interface Tiempos {
  luces:number;
  puertas:number;
  alarma: number;
  ventilador: number;
  esp: number;
}
