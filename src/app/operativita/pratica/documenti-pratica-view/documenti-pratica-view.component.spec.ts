import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentiPraticaViewComponent } from './documenti-pratica-view.component';

describe('DocumentiPraticaViewComponent', () => {
  let component: DocumentiPraticaViewComponent;
  let fixture: ComponentFixture<DocumentiPraticaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentiPraticaViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentiPraticaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
