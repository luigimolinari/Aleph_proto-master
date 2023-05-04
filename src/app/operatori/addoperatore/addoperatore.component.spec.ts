import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoperatoreComponent } from './addoperatore.component';

describe('AddoperatoreComponent', () => {
  let component: AddoperatoreComponent;
  let fixture: ComponentFixture<AddoperatoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddoperatoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddoperatoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
