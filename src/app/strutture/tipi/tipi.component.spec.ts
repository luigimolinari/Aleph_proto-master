import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipiComponent } from './tipi.component';

describe('TipiComponent', () => {
  let component: TipiComponent;
  let fixture: ComponentFixture<TipiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
