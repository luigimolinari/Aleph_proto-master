import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentiFlussoComponent } from './documenti-flusso.component';

describe('DocumentiFlussoComponent', () => {
  let component: DocumentiFlussoComponent;
  let fixture: ComponentFixture<DocumentiFlussoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentiFlussoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentiFlussoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
