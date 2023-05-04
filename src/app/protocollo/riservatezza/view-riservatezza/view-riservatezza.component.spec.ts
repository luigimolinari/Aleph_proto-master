import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRiservatezzaComponent } from './view-riservatezza.component';

describe('ViewRiservatezzaComponent', () => {
  let component: ViewRiservatezzaComponent;
  let fixture: ComponentFixture<ViewRiservatezzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRiservatezzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRiservatezzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
