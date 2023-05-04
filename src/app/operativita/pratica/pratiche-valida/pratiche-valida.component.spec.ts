import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraticheValidaComponent } from './pratiche-valida.component';

describe('PraticheValidaComponent', () => {
  let component: PraticheValidaComponent;
  let fixture: ComponentFixture<PraticheValidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PraticheValidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PraticheValidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
