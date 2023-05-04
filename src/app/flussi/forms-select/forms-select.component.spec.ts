import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsSelectComponent } from './forms-select.component';

describe('FormSelectComponent', () => {
  let component: FormsSelectComponent;
  let fixture: ComponentFixture<FormsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
