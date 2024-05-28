import { Component, Input, input } from '@angular/core';
import { Cons } from 'rxjs';

@Component({
  selector: 'app-consumos',
  standalone: true,
  imports: [],
  templateUrl: './consumos.component.html',
  styleUrl: './consumos.component.css'
})
export class ConsumosComponent {
@Input() consumos:any;

}
