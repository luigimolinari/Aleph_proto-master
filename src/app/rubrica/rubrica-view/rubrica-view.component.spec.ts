import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaViewComponent } from './rubrica-view.component';

describe('RubricaViewComponent', () => {
  let component: RubricaViewComponent;
  let fixture: ComponentFixture<RubricaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
