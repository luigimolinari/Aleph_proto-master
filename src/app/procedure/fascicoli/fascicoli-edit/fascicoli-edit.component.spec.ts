import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FascicoliEditComponent } from './fascicoli-edit.component';

describe('FascicoliEditComponent', () => {
  let component: FascicoliEditComponent;
  let fixture: ComponentFixture<FascicoliEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FascicoliEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FascicoliEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
