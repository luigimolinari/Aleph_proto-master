import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAttiEditComponent } from './tipo-atti-edit.component';

describe('TipoAttiEditComponent', () => {
  let component: TipoAttiEditComponent;
  let fixture: ComponentFixture<TipoAttiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAttiEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAttiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
