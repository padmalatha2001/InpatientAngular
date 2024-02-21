import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedAllocationComponent } from './bed-allocation.component';

describe('BedAllocationComponent', () => {
  let component: BedAllocationComponent;
  let fixture: ComponentFixture<BedAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BedAllocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BedAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
