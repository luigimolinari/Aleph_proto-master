import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInboxComponent } from './edit-inbox.component';

describe('EditInboxComponent', () => {
  let component: EditInboxComponent;
  let fixture: ComponentFixture<EditInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
