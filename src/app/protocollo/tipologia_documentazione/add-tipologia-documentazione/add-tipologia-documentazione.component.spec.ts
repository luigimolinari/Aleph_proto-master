import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipologiaDocumentazioneComponent } from './add-tipologia-documentazione.component';

describe('AddTipologiaDocumentazioneComponent', () => {
  let component: AddTipologiaDocumentazioneComponent;
  let fixture: ComponentFixture<AddTipologiaDocumentazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTipologiaDocumentazioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTipologiaDocumentazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
