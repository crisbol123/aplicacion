import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { CRUDAdminGlobalComponent } from './crud-admin-global.component';

describe('CRUDAdminGlobalComponent', () => {
  let component: CRUDAdminGlobalComponent;
  let fixture: ComponentFixture<CRUDAdminGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CRUDAdminGlobalComponent,CommonModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CRUDAdminGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
