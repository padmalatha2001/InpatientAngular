import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomKindComponent } from './room-kind.component';

describe('RoomKindComponent', () => {
  let component: RoomKindComponent;
  let fixture: ComponentFixture<RoomKindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomKindComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomKindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
