import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadsheetDocComponent } from './spreadsheet-doc.component';

describe('SpreadsheetDocComponent', () => {
  let component: SpreadsheetDocComponent;
  let fixture: ComponentFixture<SpreadsheetDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpreadsheetDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadsheetDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
