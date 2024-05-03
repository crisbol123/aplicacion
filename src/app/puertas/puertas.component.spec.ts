import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuertasComponent } from './puertas.component';

describe('PuertasComponent', () => {
  let component: PuertasComponent;
  let fixture: ComponentFixture<PuertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuertasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PuertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
