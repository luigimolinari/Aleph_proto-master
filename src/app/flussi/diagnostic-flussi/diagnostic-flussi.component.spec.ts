import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticFlussiComponent } from './diagnostic-flussi.component';

describe('DiagnosticFlussiComponent', () => {
  let component: DiagnosticFlussiComponent;
  let fixture: ComponentFixture<DiagnosticFlussiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticFlussiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticFlussiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
