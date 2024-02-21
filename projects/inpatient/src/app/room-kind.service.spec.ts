import { TestBed } from '@angular/core/testing';

import { RoomKindService } from './room-kind.service';

describe('RoomKindService', () => {
  let service: RoomKindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomKindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
