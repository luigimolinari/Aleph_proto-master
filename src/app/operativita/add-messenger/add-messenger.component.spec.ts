import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMessengerComponent } from './add-messenger.component';

describe('AddMessengerComponent', () => {
  let component: AddMessengerComponent;
  let fixture: ComponentFixture<AddMessengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMessengerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
