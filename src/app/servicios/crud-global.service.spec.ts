import { TestBed } from '@angular/core/testing';

import { CrudGlobalService } from './crud-global.service';

describe('CrudGlobalService', () => {
  let service: CrudGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
