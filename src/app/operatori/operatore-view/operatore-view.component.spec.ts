import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatoreViewComponent } from './operatore-view.component';

describe('OperatoreViewComponent', () => {
  let component: OperatoreViewComponent;
  let fixture: ComponentFixture<OperatoreViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatoreViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatoreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
