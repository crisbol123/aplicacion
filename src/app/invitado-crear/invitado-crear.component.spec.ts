import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitadoCrearComponent } from './invitado-crear.component';

describe('InvitadoCrearComponent', () => {
  let component: InvitadoCrearComponent;
  let fixture: ComponentFixture<InvitadoCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitadoCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvitadoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
