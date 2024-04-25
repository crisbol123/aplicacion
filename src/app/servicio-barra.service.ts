import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioBarraService {

  Interfaz:string='Login';
  constructor() { }

  cambioInterfaz(Tipo:string){
    this.Interfaz=Tipo;
  }
  getInterfaz():string{
    return this.Interfaz;
  }
}
