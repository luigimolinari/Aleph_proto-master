import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FascicoliComponent } from './fascicoli.component';

describe('FascicoliComponent', () => {
  let component: FascicoliComponent;
  let fixture: ComponentFixture<FascicoliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FascicoliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FascicoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
