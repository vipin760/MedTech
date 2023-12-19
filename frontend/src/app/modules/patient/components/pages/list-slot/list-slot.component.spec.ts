import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSlotComponent } from './list-slot.component';

describe('ListSlotComponent', () => {
  let component: ListSlotComponent;
  let fixture: ComponentFixture<ListSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSlotComponent]
    });
    fixture = TestBed.createComponent(ListSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
