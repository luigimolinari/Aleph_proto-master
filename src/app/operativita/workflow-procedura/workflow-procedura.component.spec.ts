import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowProceduraComponent } from './workflow-procedura.component';

describe('WorkflowProceduraComponent', () => {
  let component: WorkflowProceduraComponent;
  let fixture: ComponentFixture<WorkflowProceduraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowProceduraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowProceduraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
