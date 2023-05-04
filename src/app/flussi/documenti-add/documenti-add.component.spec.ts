import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentiAddComponent } from './documenti-add.component';

describe('DocumentiAddComponent', () => {
  let component: DocumentiAddComponent;
  let fixture: ComponentFixture<DocumentiAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentiAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
