import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaAziendaEditComponent } from './rubrica-azienda-edit.component';

describe('RubricaAziendaEditComponent', () => {
  let component: RubricaAziendaEditComponent;
  let fixture: ComponentFixture<RubricaAziendaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaAziendaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaAziendaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
