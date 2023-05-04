import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTipoRubricaComponent } from './view-tipo-rubrica.component';

describe('ViewTipoRubricaComponent', () => {
  let component: ViewTipoRubricaComponent;
  let fixture: ComponentFixture<ViewTipoRubricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTipoRubricaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTipoRubricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
