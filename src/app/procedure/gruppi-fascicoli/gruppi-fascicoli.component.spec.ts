import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppiFascicoliComponent } from './gruppi-fascicoli.component';

describe('GruppiFascicoliComponent', () => {
  let component: GruppiFascicoliComponent;
  let fixture: ComponentFixture<GruppiFascicoliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruppiFascicoliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruppiFascicoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
