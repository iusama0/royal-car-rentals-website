import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingDetailComponent } from './admin-booking-detail.component';

describe('AdminBookingDetailComponent', () => {
  let component: AdminBookingDetailComponent;
  let fixture: ComponentFixture<AdminBookingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBookingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
