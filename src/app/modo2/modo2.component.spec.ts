import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modo2Component } from './modo2.component';

describe('Modo2Component', () => {
  let component: Modo2Component;
  let fixture: ComponentFixture<Modo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modo2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Modo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
