import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoGruppoEditComponent } from './tipo-gruppo-edit.component';

describe('TipoGruppoEditComponent', () => {
  let component: TipoGruppoEditComponent;
  let fixture: ComponentFixture<TipoGruppoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoGruppoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoGruppoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
