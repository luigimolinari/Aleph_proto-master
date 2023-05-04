import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlussiComponent } from './flussi.component';

describe('FlussiComponent', () => {
  let component: FlussiComponent;
  let fixture: ComponentFixture<FlussiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlussiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlussiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
