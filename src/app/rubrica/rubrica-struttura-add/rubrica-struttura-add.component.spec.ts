import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaStrutturaAddComponent } from './rubrica-struttura-add.component';

describe('RubricaStrutturaAddComponent', () => {
  let component: RubricaStrutturaAddComponent;
  let fixture: ComponentFixture<RubricaStrutturaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaStrutturaAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaStrutturaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
