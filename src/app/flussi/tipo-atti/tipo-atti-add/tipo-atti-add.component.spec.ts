import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAttiAddComponent } from './tipo-atti-add.component';

describe('TipoAttiAddComponent', () => {
  let component: TipoAttiAddComponent;
  let fixture: ComponentFixture<TipoAttiAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAttiAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAttiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
