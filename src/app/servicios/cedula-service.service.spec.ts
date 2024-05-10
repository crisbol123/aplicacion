import { TestBed } from '@angular/core/testing';

import { CedulaServiceService } from './cedula-service.service';

describe('CedulaServiceService', () => {
  let service: CedulaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CedulaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
