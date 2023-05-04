import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowCAddComponent } from './workflow-c-add.component';

describe('WorkflowCAddComponent', () => {
  let component: WorkflowCAddComponent;
  let fixture: ComponentFixture<WorkflowCAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowCAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowCAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
