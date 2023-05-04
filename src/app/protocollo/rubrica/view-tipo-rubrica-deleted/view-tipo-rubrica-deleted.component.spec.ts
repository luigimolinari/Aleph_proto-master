import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTipoRubricaDeletedComponent } from './view-tipo-rubrica-deleted.component';

describe('ViewTipoRubricaDeletedComponent', () => {
  let component: ViewTipoRubricaDeletedComponent;
  let fixture: ComponentFixture<ViewTipoRubricaDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTipoRubricaDeletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTipoRubricaDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
