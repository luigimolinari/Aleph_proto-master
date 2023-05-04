import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTerminaComponent } from './form-termina.component';

describe('FormTerminaComponent', () => {
  let component: FormTerminaComponent;
  let fixture: ComponentFixture<FormTerminaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTerminaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTerminaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
