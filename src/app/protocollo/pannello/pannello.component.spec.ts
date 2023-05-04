import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannelloComponent } from './pannello.component';

describe('PannelloComponent', () => {
  let component: PannelloComponent;
  let fixture: ComponentFixture<PannelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PannelloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PannelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
