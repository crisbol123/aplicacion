import { TestBed } from '@angular/core/testing';

import { ServicioAdjustTimeService } from './servicio-adjust-time.service';

describe('ServicioAdjustTimeService', () => {
  let service: ServicioAdjustTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioAdjustTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
