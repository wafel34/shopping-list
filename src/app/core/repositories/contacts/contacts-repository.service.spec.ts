import { TestBed } from '@angular/core/testing';

import { ContactsRepositoryService } from './contacts-repository.service';

describe('ContactsRepositoryService', () => {
  let service: ContactsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
