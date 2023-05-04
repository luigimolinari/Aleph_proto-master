import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInboxComponent } from './add-inbox.component';

describe('AddInboxComponent', () => {
  let component: AddInboxComponent;
  let fixture: ComponentFixture<AddInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
