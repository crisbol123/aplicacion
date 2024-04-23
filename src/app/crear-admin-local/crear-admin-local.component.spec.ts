import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAdminLocalComponent } from './crear-admin-local.component';

describe('CrearAdminLocalComponent', () => {
  let component: CrearAdminLocalComponent;
  let fixture: ComponentFixture<CrearAdminLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAdminLocalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearAdminLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
