import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDriverDetailComponent } from './admin-driver-detail.component';

describe('AdminDriverDetailComponent', () => {
  let component: AdminDriverDetailComponent;
  let fixture: ComponentFixture<AdminDriverDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDriverDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDriverDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
