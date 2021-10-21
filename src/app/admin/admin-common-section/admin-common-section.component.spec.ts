import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommonSectionComponent } from './admin-common-section.component';

describe('AdminCommonSectionComponent', () => {
  let component: AdminCommonSectionComponent;
  let fixture: ComponentFixture<AdminCommonSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommonSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommonSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
