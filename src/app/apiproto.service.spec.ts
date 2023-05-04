import { TestBed } from '@angular/core/testing';

import { ApiprotoService } from './apiproto.service';

describe('ApiprotoService', () => {
  let service: ApiprotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiprotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
