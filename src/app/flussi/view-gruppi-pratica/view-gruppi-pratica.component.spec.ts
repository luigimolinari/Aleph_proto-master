import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGruppiPraticaComponent } from './view-gruppi-pratica.component';

describe('ViewGruppiPraticaComponent', () => {
  let component: ViewGruppiPraticaComponent;
  let fixture: ComponentFixture<ViewGruppiPraticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGruppiPraticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGruppiPraticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
