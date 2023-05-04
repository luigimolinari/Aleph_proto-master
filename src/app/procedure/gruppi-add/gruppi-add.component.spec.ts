import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppiAddComponent } from './gruppi-add.component';

describe('GruppiAddComponent', () => {
  let component: GruppiAddComponent;
  let fixture: ComponentFixture<GruppiAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruppiAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruppiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
