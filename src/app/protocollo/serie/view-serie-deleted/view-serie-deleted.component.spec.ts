import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSerieDeletedComponent } from './view-serie-deleted.component';

describe('ViewSerieDeletedComponent', () => {
  let component: ViewSerieDeletedComponent;
  let fixture: ComponentFixture<ViewSerieDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSerieDeletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSerieDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
