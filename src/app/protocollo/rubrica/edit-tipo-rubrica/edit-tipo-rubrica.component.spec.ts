import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipoRubricaComponent } from './edit-tipo-rubrica.component';

describe('EditTipoRubricaComponent', () => {
  let component: EditTipoRubricaComponent;
  let fixture: ComponentFixture<EditTipoRubricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTipoRubricaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTipoRubricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
