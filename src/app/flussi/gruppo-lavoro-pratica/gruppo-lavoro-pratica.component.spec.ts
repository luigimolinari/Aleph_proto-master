import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppoLavoroPraticaComponent } from './gruppo-lavoro-pratica.component';

describe('GruppoLavoroPraticaComponent', () => {
  let component: GruppoLavoroPraticaComponent;
  let fixture: ComponentFixture<GruppoLavoroPraticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruppoLavoroPraticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruppoLavoroPraticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
