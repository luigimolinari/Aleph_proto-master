import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentoPraticaComponent } from './add-documento-pratica.component';

describe('AddDocumentoPraticaComponent', () => {
  let component: AddDocumentoPraticaComponent;
  let fixture: ComponentFixture<AddDocumentoPraticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDocumentoPraticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocumentoPraticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
