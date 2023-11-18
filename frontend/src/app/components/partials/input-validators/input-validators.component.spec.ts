import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputValidatorsComponent } from './input-validators.component';

describe('InputValidatorsComponent', () => {
  let component: InputValidatorsComponent;
  let fixture: ComponentFixture<InputValidatorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputValidatorsComponent]
    });
    fixture = TestBed.createComponent(InputValidatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
