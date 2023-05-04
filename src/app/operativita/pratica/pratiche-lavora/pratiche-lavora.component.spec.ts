import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraticheLavoraComponent } from './pratiche-lavora.component';

describe('PraticheLavoraComponent', () => {
  let component: PraticheLavoraComponent;
  let fixture: ComponentFixture<PraticheLavoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PraticheLavoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PraticheLavoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
