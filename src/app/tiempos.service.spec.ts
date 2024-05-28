import { TestBed } from '@angular/core/testing';

import { TiemposService } from './tiempos.service';

describe('TiemposService', () => {
  let service: TiemposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiemposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
