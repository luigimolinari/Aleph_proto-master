import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlussiAddComponent } from './flussi-add.component';

describe('FlussiAddComponent', () => {
  let component: FlussiAddComponent;
  let fixture: ComponentFixture<FlussiAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlussiAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlussiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
