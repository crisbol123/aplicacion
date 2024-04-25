import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitadoActualizarComponent } from './invitado-actualizar.component';

describe('InvitadoActualizarComponent', () => {
  let component: InvitadoActualizarComponent;
  let fixture: ComponentFixture<InvitadoActualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitadoActualizarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvitadoActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
