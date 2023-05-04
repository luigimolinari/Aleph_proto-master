import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpreadsheetComponent } from './edit-spreadsheet.component';

describe('EditSpreadsheetComponent', () => {
  let component: EditSpreadsheetComponent;
  let fixture: ComponentFixture<EditSpreadsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSpreadsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpreadsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
