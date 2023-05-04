import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaStrutturaViewComponent } from './rubrica-struttura-view.component';

describe('RubricaStrutturaViewComponent', () => {
  let component: RubricaStrutturaViewComponent;
  let fixture: ComponentFixture<RubricaStrutturaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaStrutturaViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaStrutturaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
