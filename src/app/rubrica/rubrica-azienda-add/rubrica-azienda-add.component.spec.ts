import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaAziendaAddComponent } from './rubrica-azienda-add.component';

describe('RubricaAziendaAddComponent', () => {
  let component: RubricaAziendaAddComponent;
  let fixture: ComponentFixture<RubricaAziendaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaAziendaAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaAziendaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
