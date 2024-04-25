import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitadoEliminarComponent } from './invitado-eliminar.component';

describe('InvitadoEliminarComponent', () => {
  let component: InvitadoEliminarComponent;
  let fixture: ComponentFixture<InvitadoEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitadoEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvitadoEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
