import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustTimeComponent } from './adjust-time.component';

describe('AdjustTimeComponent', () => {
  let component: AdjustTimeComponent;
  let fixture: ComponentFixture<AdjustTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdjustTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdjustTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
