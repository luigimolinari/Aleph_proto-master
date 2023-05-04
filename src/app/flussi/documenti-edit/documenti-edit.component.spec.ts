import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentiEditComponent } from './documenti-edit.component';

describe('DocumentiEditComponent', () => {
  let component: DocumentiEditComponent;
  let fixture: ComponentFixture<DocumentiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentiEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
