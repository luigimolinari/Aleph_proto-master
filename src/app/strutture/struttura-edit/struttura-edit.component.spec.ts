import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrutturaEditComponent } from './struttura-edit.component';

describe('StrutturaEditComponent', () => {
  let component: StrutturaEditComponent;
  let fixture: ComponentFixture<StrutturaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrutturaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrutturaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
