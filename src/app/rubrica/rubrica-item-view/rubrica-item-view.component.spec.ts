import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaItemViewComponent } from './rubrica-item-view.component';

describe('RubricaItemViewComponent', () => {
  let component: RubricaItemViewComponent;
  let fixture: ComponentFixture<RubricaItemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaItemViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
