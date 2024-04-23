import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdminLocalComponent } from './delete-admin-local.component';

describe('DeleteAdminLocalComponent', () => {
  let component: DeleteAdminLocalComponent;
  let fixture: ComponentFixture<DeleteAdminLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAdminLocalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteAdminLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
