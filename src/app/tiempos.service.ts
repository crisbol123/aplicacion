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
      { tluces:0, tpuertas:0, talarma: 0, tventilador: 0, tesp: 0 },
      { tluces:0, tpuertas:0, talarma: 0, tventilador: 0, tesp: 0 },
      { tluces:0, tpuertas:0, talarma: 0, tventilador: 0, tesp: 0 },
      { tluces:0, tpuertas:0, talarma: 0, tventilador: 0, tesp: 0 },
      { tluces:0, tpuertas:0, talarma: 0, tventilador: 0, tesp: 0 },
      { tluces:0, tpuertas:0, talarma: 0, tventilador: 0, tesp: 0 },
      { tluces:0, tpuertas:0, talarma: 0, tventilador: 0, tesp: 0 },
      { tluces:0, tpuertas:0, talarma: 0, tventilador: 0, tesp: 0 },
      { tluces:0, tpuertas:0, talarma: 0, tventilador: 0, tesp: 0 },
      { tluces:0, tpuertas:0, talarma: 0, tventilador: 0, tesp: 0 },
      { tluces:0, tpuertas:0, talarma: 0, tventilador: 0, tesp: 0 },
      { tluces:0, tpuertas:0, talarma: 0, tventilador: 0, tesp: 0 }
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
    return t1.tluces === t2.tluces &&
           t1.tpuertas === t2.tpuertas &&
           t1.talarma === t2.talarma &&
           t1.tventilador === t2.tventilador &&
           t1.tesp === t2.tesp;
  }

  getRequest(): Observable<Tiempos[]> {
    return this.http.get<Tiempos[]>('http://localhost:8081/tiempos/recibirTiempos');
  }
  getTiempos(): Observable<Tiempos[]> {
    return this.tiempos$.asObservable();
  }
}

interface Tiempos {
  tluces:number;
  tpuertas:number;
  talarma: number;
  tventilador: number;
  tesp: number;
}
