import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowNewProceduraComponent } from './workflow-new-procedura.component';

describe('WorkflowNewProceduraComponent', () => {
  let component: WorkflowNewProceduraComponent;
  let fixture: ComponentFixture<WorkflowNewProceduraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowNewProceduraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowNewProceduraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
