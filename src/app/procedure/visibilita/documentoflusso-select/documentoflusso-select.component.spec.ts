import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoflussoSelectComponent } from './documentoflusso-select.component';

describe('DocumentoflussoSelectComponent', () => {
  let component: DocumentoflussoSelectComponent;
  let fixture: ComponentFixture<DocumentoflussoSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoflussoSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoflussoSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
