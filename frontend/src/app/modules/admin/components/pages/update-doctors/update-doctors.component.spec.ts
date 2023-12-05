import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDoctorsComponent } from './update-doctors.component';

describe('UpdateDoctorsComponent', () => {
  let component: UpdateDoctorsComponent;
  let fixture: ComponentFixture<UpdateDoctorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDoctorsComponent]
    });
    fixture = TestBed.createComponent(UpdateDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
