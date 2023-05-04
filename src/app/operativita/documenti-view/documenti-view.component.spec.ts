import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentiViewComponent } from './documenti-view.component';

describe('DocumentiViewComponent', () => {
  let component: DocumentiViewComponent;
  let fixture: ComponentFixture<DocumentiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentiViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
