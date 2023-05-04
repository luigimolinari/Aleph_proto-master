import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTipologiaDocumentazioneDeletedComponent } from './view-tipologia-documentazione-deleted.component';

describe('ViewTipologiaDocumentazioneDeletedComponent', () => {
  let component: ViewTipologiaDocumentazioneDeletedComponent;
  let fixture: ComponentFixture<ViewTipologiaDocumentazioneDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTipologiaDocumentazioneDeletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTipologiaDocumentazioneDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
