import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtichetteComponent } from './etichette.component';

describe('EtichetteComponent', () => {
  let component: EtichetteComponent;
  let fixture: ComponentFixture<EtichetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtichetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtichetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
