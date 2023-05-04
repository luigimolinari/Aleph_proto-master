import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FascicoliAddComponent } from './fascicoli-add.component';

describe('FascicoliAddComponent', () => {
  let component: FascicoliAddComponent;
  let fixture: ComponentFixture<FascicoliAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FascicoliAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FascicoliAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
