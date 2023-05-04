import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RupSelectComponent } from './rup-select.component';

describe('RupSelectComponent', () => {
  let component: RupSelectComponent;
  let fixture: ComponentFixture<RupSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RupSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RupSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
