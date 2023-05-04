import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocumentoPraticaComponent } from './edit-documento-pratica.component';

describe('EditDocumentoPraticaComponent', () => {
  let component: EditDocumentoPraticaComponent;
  let fixture: ComponentFixture<EditDocumentoPraticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDocumentoPraticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDocumentoPraticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
