import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LucesTiempoService {

  private tiempo_luces$: BehaviorSubject<number[]>;

  constructor(private http: HttpClient) {
    this.tiempo_luces$ = new BehaviorSubject<number[]>([0, 0, 0]);

    this.getRequest().subscribe((data) => {
      const tiempos = data.map((item: luces) => item.tiempoactivado);
      this.tiempo_luces$.next(tiempos);
    });

    this.startPolling();
  }

  private startPolling(): void {
    setInterval(() => {
      this.getRequest().subscribe((data) => {
        const nuevosTiempos = data.map((item: luces) => item.tiempoactivado);
        if (!this.arraysEqual(this.tiempo_luces$.value, nuevosTiempos)) {
          this.tiempo_luces$.next(nuevosTiempos);
        }
      });
    }, 2000);
  }

  private arraysEqual(arr1: number[], arr2: number[]): boolean {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  getRequest(): Observable<luces[]> {
    return this.http.get<luces[]>('http://localhost:8081/luces/recibirTiempo');
  }
  
  getTime(): Observable<number[]> {
    return this.tiempo_luces$.asObservable();
  }
}

export class luces {
  id_bombillo: any;
  tiempoactivado: any;
}
