import { TestBed } from '@angular/core/testing';

import { SolicitudesPhpLuzService } from './solicitudes-php-luz.service';

describe('SolicitudesPhpLuzService', () => {
  let service: SolicitudesPhpLuzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudesPhpLuzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
