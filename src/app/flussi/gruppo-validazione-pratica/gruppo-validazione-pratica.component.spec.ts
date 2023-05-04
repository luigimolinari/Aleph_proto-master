import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppoValidazionePraticaComponent } from './gruppo-validazione-pratica.component';

describe('GruppoValidazionePraticaComponent', () => {
  let component: GruppoValidazionePraticaComponent;
  let fixture: ComponentFixture<GruppoValidazionePraticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruppoValidazionePraticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruppoValidazionePraticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
