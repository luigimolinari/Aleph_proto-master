import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaDispatcher1Component } from './rubrica-dispatcher1.component';

describe('RubricaDispatcher1Component', () => {
  let component: RubricaDispatcher1Component;
  let fixture: ComponentFixture<RubricaDispatcher1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaDispatcher1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaDispatcher1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
