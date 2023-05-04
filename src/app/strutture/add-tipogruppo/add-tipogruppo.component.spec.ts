import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipogruppoComponent } from './add-tipogruppo.component';

describe('AddTipogruppoComponent', () => {
  let component: AddTipogruppoComponent;
  let fixture: ComponentFixture<AddTipogruppoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTipogruppoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTipogruppoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
