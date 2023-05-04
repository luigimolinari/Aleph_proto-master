import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentiCollAddComponent } from './documenti-coll-add.component';

describe('DocumentiCollAddComponent', () => {
  let component: DocumentiCollAddComponent;
  let fixture: ComponentFixture<DocumentiCollAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentiCollAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentiCollAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
