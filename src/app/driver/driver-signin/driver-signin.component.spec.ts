import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSigninComponent } from './driver-signin.component';

describe('DriverSigninComponent', () => {
  let component: DriverSigninComponent;
  let fixture: ComponentFixture<DriverSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverSigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
