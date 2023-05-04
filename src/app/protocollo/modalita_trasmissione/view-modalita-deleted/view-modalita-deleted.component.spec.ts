import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModalitaDeletedComponent } from './view-modalita-deleted.component';

describe('ViewModalitaDeletedComponent', () => {
  let component: ViewModalitaDeletedComponent;
  let fixture: ComponentFixture<ViewModalitaDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewModalitaDeletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModalitaDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
