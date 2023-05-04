import { TestBed } from '@angular/core/testing';

import { ApiextService } from './apiext.service';

describe('ApiextService', () => {
  let service: ApiextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
