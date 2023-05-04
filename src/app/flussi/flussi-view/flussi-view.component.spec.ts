import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlussiViewComponent } from './flussi-view.component';

describe('FlussiViewComponent', () => {
  let component: FlussiViewComponent;
  let fixture: ComponentFixture<FlussiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlussiViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlussiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
