import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAdminLocalComponent } from './read-admin-local.component';

describe('ReadAdminLocalComponent', () => {
  let component: ReadAdminLocalComponent;
  let fixture: ComponentFixture<ReadAdminLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadAdminLocalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadAdminLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
