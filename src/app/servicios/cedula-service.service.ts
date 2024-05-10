import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CedulaServiceService {

  private cedulaSource = new BehaviorSubject<string>('');
  cedula$ = this.cedulaSource.asObservable();

  enviarCedula(cedula: string) {
    this.cedulaSource.next(cedula);
  }
}
