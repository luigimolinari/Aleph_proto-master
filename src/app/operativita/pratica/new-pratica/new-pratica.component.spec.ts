import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPraticaComponent } from './new-pratica.component';

describe('NewPraticaComponent', () => {
  let component: NewPraticaComponent;
  let fixture: ComponentFixture<NewPraticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPraticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPraticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
