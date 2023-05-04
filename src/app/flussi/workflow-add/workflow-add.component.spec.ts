import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowAddComponent } from './workflow-add.component';

describe('WorkflowAddComponent', () => {
  let component: WorkflowAddComponent;
  let fixture: ComponentFixture<WorkflowAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
