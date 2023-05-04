import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaPersoneViewComponent } from './rubrica-persone-view.component';

describe('RubricaPersoneViewComponent', () => {
  let component: RubricaPersoneViewComponent;
  let fixture: ComponentFixture<RubricaPersoneViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaPersoneViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaPersoneViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
