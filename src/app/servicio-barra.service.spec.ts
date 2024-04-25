import { TestBed } from '@angular/core/testing';

import { ServicioBarraService } from './servicio-barra.service';

describe('ServicioBarraService', () => {
  let service: ServicioBarraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioBarraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
