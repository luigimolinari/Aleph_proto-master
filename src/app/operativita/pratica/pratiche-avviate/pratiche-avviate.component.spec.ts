import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraticheAvviateComponent } from './pratiche-avviate.component';

describe('PraticheAvviateComponent', () => {
  let component: PraticheAvviateComponent;
  let fixture: ComponentFixture<PraticheAvviateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PraticheAvviateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PraticheAvviateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
