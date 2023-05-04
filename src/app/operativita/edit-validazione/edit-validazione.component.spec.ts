import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditValidazioneComponent } from './edit-validazione.component';

describe('EditValidazioneComponent', () => {
  let component: EditValidazioneComponent;
  let fixture: ComponentFixture<EditValidazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditValidazioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditValidazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
