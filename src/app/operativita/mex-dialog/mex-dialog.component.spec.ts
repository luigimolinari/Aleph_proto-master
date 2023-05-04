import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MexDialogComponent } from './mex-dialog.component';

describe('MexDialogComponent', () => {
  let component: MexDialogComponent;
  let fixture: ComponentFixture<MexDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MexDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MexDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
