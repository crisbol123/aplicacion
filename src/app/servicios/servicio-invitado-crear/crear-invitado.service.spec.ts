import { TestBed } from '@angular/core/testing';

import { CrearInvitadoService } from './crear-invitado.service';

describe('CrearInvitadoService', () => {
  let service: CrearInvitadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearInvitadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
