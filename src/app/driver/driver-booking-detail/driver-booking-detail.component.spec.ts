import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverBookingDetailComponent } from './driver-booking-detail.component';

describe('DriverBookingDetailComponent', () => {
  let component: DriverBookingDetailComponent;
  let fixture: ComponentFixture<DriverBookingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverBookingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverBookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
