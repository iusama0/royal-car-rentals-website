import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverCommonSectionComponent } from './driver-common-section.component';

describe('DriverCommonSectionComponent', () => {
  let component: DriverCommonSectionComponent;
  let fixture: ComponentFixture<DriverCommonSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverCommonSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverCommonSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
