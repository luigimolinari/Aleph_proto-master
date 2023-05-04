import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlussiEditComponent } from './flussi-edit.component';

describe('FlussiEditComponent', () => {
  let component: FlussiEditComponent;
  let fixture: ComponentFixture<FlussiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlussiEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlussiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
