import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRiservatezzaDeletedComponent } from './view-riservatezza-deleted.component';

describe('ViewRiservatezzaDeletedComponent', () => {
  let component: ViewRiservatezzaDeletedComponent;
  let fixture: ComponentFixture<ViewRiservatezzaDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRiservatezzaDeletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRiservatezzaDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
