import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVehicleDetailComponent } from './admin-vehicle-detail.component';

describe('AdminVehicleDetailComponent', () => {
  let component: AdminVehicleDetailComponent;
  let fixture: ComponentFixture<AdminVehicleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVehicleDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVehicleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
