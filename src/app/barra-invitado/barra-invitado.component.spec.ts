import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraInvitadoComponent } from './barra-invitado.component';

describe('BarraInvitadoComponent', () => {
  let component: BarraInvitadoComponent;
  let fixture: ComponentFixture<BarraInvitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraInvitadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarraInvitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
