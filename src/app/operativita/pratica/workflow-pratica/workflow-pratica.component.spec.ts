import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowPraticaComponent } from './workflow-pratica.component';

describe('WorkflowPraticaComponent', () => {
  let component: WorkflowPraticaComponent;
  let fixture: ComponentFixture<WorkflowPraticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowPraticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowPraticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
