import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricaAziendaItemViewComponent } from './rubrica-azienda-item-view.component';

describe('RubricaAziendaItemViewComponent', () => {
  let component: RubricaAziendaItemViewComponent;
  let fixture: ComponentFixture<RubricaAziendaItemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricaAziendaItemViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaAziendaItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
