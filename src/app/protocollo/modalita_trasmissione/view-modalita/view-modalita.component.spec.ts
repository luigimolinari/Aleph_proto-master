import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModalitaComponent } from './view-modalita.component';

describe('ViewModalitaComponent', () => {
  let component: ViewModalitaComponent;
  let fixture: ComponentFixture<ViewModalitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewModalitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModalitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
