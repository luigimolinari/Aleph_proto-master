import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocumentoComponent } from './view-documento.component';

describe('ViewDocumentoComponent', () => {
  let component: ViewDocumentoComponent;
  let fixture: ComponentFixture<ViewDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
