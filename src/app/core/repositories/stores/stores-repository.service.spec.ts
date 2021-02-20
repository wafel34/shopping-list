import { TestBed } from '@angular/core/testing';

import { StoresRepositoryService } from './stores-repository.service';

describe('StoresRepositoryService', () => {
  let service: StoresRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoresRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
