import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaStrutturaEditComponent } from './rubrica-struttura-edit.component';

describe('RubricaStrutturaEditComponent', () => {
  let component: RubricaStrutturaEditComponent;
  let fixture: ComponentFixture<RubricaStrutturaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaStrutturaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaStrutturaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
