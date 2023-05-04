import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduraSelectComponent } from './procedura-select.component';

describe('ProceduraSelectComponent', () => {
  let component: ProceduraSelectComponent;
  let fixture: ComponentFixture<ProceduraSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceduraSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceduraSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
