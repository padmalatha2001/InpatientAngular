import { TestBed } from '@angular/core/testing';

import { RoomtypeDetailsService } from './roomtype-details.service';

describe('RoomtypeDetailsService', () => {
  let service: RoomtypeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomtypeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
