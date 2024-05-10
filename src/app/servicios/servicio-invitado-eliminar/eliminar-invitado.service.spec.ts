import { TestBed } from '@angular/core/testing';

import { EliminarInvitadoService } from './eliminar-invitado.service';

describe('EliminarInvitadoService', () => {
  let service: EliminarInvitadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EliminarInvitadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
