import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraAdminLocalComponent } from './barra-admin-local.component';

describe('BarraAdminLocalComponent', () => {
  let component: BarraAdminLocalComponent;
  let fixture: ComponentFixture<BarraAdminLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraAdminLocalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarraAdminLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
