import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentiSelectComponent } from './documenti-select.component';

describe('DocumentiSelectComponent', () => {
  let component: DocumentiSelectComponent;
  let fixture: ComponentFixture<DocumentiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentiSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
