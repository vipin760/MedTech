import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsNavbarComponent } from './patients-navbar.component';

describe('PatientsNavbarComponent', () => {
  let component: PatientsNavbarComponent;
  let fixture: ComponentFixture<PatientsNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientsNavbarComponent]
    });
    fixture = TestBed.createComponent(PatientsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
