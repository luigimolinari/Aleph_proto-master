import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppiProceduraComponent } from './gruppi-procedura.component';

describe('GruppiProceduraComponent', () => {
  let component: GruppiProceduraComponent;
  let fixture: ComponentFixture<GruppiProceduraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruppiProceduraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruppiProceduraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
