import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaEditComponent } from './rubrica-edit.component';

describe('RubricaEditComponent', () => {
  let component: RubricaEditComponent;
  let fixture: ComponentFixture<RubricaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
