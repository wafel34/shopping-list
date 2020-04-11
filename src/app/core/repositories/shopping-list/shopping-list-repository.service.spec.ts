import { TestBed } from '@angular/core/testing';

import { ShoppingListRepositoryService } from './shopping-list-repository.service';

describe('ShoppingListRepositoryService', () => {
  let service: ShoppingListRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingListRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
