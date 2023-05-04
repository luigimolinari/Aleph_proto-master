import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProcedureComponent } from './select-procedure.component';

describe('SelectProcedureComponent', () => {
  let component: SelectProcedureComponent;
  let fixture: ComponentFixture<SelectProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProcedureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
