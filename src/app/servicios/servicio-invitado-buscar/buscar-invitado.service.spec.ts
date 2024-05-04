import { TestBed } from '@angular/core/testing';

import { BuscarInvitadoService } from './buscar-invitado.service';

describe('BuscarInvitadoService', () => {
  let service: BuscarInvitadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarInvitadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
