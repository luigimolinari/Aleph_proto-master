import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipologiaDocumentazioneComponent } from './edit-tipologia-documentazione.component';

describe('EditTipologiaDocumentazioneComponent', () => {
  let component: EditTipologiaDocumentazioneComponent;
  let fixture: ComponentFixture<EditTipologiaDocumentazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTipologiaDocumentazioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTipologiaDocumentazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
