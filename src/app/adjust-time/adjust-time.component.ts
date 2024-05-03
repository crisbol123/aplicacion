import { Component } from '@angular/core';
import { BarraAdminLocalComponent } from '../barra-admin-local/barra-admin-local.component';

@Component({
  selector: 'app-adjust-time',
  standalone: true,
  imports: [BarraAdminLocalComponent],
  templateUrl: './adjust-time.component.html',
  styleUrl: './adjust-time.component.css'
})
export class AdjustTimeComponent {
  constructor() { }

  // Método que se llama cada vez que se mueve el slider
  onChangeSlider(event: Event) {
    const sliderValue = (event.target as HTMLInputElement).value;
    console.log('Valor del slider:', sliderValue);
    // Aquí puedes hacer lo que necesites con el valor del slider
  }
}
