import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FascicoliViewComponent } from './fascicoli-view.component';

describe('FascicoliViewComponent', () => {
  let component: FascicoliViewComponent;
  let fixture: ComponentFixture<FascicoliViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FascicoliViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FascicoliViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
