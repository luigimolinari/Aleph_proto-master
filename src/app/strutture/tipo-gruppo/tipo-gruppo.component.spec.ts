import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoGruppoComponent } from './tipo-gruppo.component';

describe('TipoGruppoComponent', () => {
  let component: TipoGruppoComponent;
  let fixture: ComponentFixture<TipoGruppoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoGruppoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoGruppoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
