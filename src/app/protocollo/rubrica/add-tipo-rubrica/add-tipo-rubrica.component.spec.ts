import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipoRubricaComponent } from './add-tipo-rubrica.component';

describe('AddTipoRubricaComponent', () => {
  let component: AddTipoRubricaComponent;
  let fixture: ComponentFixture<AddTipoRubricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTipoRubricaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTipoRubricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
