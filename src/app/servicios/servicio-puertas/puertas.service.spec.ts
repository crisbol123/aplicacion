import { TestBed } from '@angular/core/testing';

import { PuertasService } from './puertas.service';

describe('PuertasService', () => {
  let service: PuertasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuertasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
