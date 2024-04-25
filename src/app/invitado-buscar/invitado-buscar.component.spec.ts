import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitadoBuscarComponent } from './invitado-buscar.component';

describe('InvitadoBuscarComponent', () => {
  let component: InvitadoBuscarComponent;
  let fixture: ComponentFixture<InvitadoBuscarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitadoBuscarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvitadoBuscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
