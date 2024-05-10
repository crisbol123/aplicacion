import { TestBed } from '@angular/core/testing';

import { ActualizarInvitadoService } from './actualizar-invitado.service';

describe('ActualizarInvitadoService', () => {
  let service: ActualizarInvitadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualizarInvitadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
