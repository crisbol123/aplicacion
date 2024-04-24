import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesAvanzadasComponent } from './opciones-avanzadas.component';

describe('OpcionesAvanzadasComponent', () => {
  let component: OpcionesAvanzadasComponent;
  let fixture: ComponentFixture<OpcionesAvanzadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionesAvanzadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcionesAvanzadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
