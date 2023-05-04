import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTipologiaDocumentazioneComponent } from './view-tipologia-documentazione.component';

describe('ViewTipologiaDocumentazioneComponent', () => {
  let component: ViewTipologiaDocumentazioneComponent;
  let fixture: ComponentFixture<ViewTipologiaDocumentazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTipologiaDocumentazioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTipologiaDocumentazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
