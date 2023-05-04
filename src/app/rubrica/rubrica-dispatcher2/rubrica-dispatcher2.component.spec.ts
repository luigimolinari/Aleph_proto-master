import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaDispatcher2Component } from './rubrica-dispatcher2.component';

describe('RubricaDispatcher2Component', () => {
  let component: RubricaDispatcher2Component;
  let fixture: ComponentFixture<RubricaDispatcher2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaDispatcher2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaDispatcher2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
