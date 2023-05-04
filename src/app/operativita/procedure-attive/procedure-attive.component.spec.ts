import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureAttiveComponent } from './procedure-attive.component';

describe('ProcedureAttiveComponent', () => {
  let component: ProcedureAttiveComponent;
  let fixture: ComponentFixture<ProcedureAttiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedureAttiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureAttiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
