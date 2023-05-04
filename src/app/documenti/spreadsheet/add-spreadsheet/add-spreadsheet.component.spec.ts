import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpreadsheetComponent } from './add-spreadsheet.component';

describe('AddSpreadsheetComponent', () => {
  let component: AddSpreadsheetComponent;
  let fixture: ComponentFixture<AddSpreadsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSpreadsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpreadsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
