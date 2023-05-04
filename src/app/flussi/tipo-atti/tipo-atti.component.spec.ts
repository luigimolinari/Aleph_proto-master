import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAttiComponent } from './tipo-atti.component';

describe('TipoAttiComponent', () => {
  let component: TipoAttiComponent;
  let fixture: ComponentFixture<TipoAttiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAttiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAttiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
