import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSerieComponent } from './view-serie.component';

describe('ViewSerieComponent', () => {
  let component: ViewSerieComponent;
  let fixture: ComponentFixture<ViewSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSerieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
