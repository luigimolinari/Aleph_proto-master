import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlussiSelectComponent } from './flussi-select.component';

describe('FlussiSelectComponent', () => {
  let component: FlussiSelectComponent;
  let fixture: ComponentFixture<FlussiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlussiSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlussiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
