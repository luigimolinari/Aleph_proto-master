import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppiOperatoreComponent } from './gruppi-operatore.component';

describe('GruppiOperatoreComponent', () => {
  let component: GruppiOperatoreComponent;
  let fixture: ComponentFixture<GruppiOperatoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruppiOperatoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruppiOperatoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
