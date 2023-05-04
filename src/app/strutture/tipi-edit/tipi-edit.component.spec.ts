import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipiEditComponent } from './tipi-edit.component';

describe('TipiEditComponent', () => {
  let component: TipiEditComponent;
  let fixture: ComponentFixture<TipiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipiEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
