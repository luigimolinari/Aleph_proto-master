import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormObbligatoriComponent } from './form-obbligatori.component';

describe('FormObbligatoriComponent', () => {
  let component: FormObbligatoriComponent;
  let fixture: ComponentFixture<FormObbligatoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormObbligatoriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormObbligatoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
