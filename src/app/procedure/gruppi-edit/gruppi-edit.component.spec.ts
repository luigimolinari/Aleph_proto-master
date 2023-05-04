import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppiEditComponent } from './gruppi-edit.component';

describe('GruppiEditComponent', () => {
  let component: GruppiEditComponent;
  let fixture: ComponentFixture<GruppiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruppiEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruppiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
