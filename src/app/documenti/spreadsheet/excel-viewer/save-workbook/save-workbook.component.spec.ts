import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveWorkbookComponent } from './save-workbook.component';

describe('SaveWorkbookComponent', () => {
  let component: SaveWorkbookComponent;
  let fixture: ComponentFixture<SaveWorkbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveWorkbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveWorkbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
