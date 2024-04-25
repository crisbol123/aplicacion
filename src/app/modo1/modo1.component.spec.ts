import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modo1Component } from './modo1.component';

describe('Modo1Component', () => {
  let component: Modo1Component;
  let fixture: ComponentFixture<Modo1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modo1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
