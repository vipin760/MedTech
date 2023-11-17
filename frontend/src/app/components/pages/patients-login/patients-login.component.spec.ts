import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsLoginComponent } from './patients-login.component';

describe('PatientsLoginComponent', () => {
  let component: PatientsLoginComponent;
  let fixture: ComponentFixture<PatientsLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientsLoginComponent]
    });
    fixture = TestBed.createComponent(PatientsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
