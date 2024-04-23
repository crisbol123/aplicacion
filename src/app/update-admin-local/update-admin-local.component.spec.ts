import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminLocalComponent } from './update-admin-local.component';

describe('UpdateAdminLocalComponent', () => {
  let component: UpdateAdminLocalComponent;
  let fixture: ComponentFixture<UpdateAdminLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAdminLocalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAdminLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
