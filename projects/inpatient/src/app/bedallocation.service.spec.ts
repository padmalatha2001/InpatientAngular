import { TestBed } from '@angular/core/testing';

import { BedallocationService } from './bedallocation.service';

describe('BedallocationService', () => {
  let service: BedallocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BedallocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
