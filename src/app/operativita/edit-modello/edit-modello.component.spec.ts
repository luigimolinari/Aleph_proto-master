import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModelloComponent } from './edit-modello.component';

describe('EditModelloComponent', () => {
  let component: EditModelloComponent;
  let fixture: ComponentFixture<EditModelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModelloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
