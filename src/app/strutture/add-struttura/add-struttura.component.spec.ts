import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStrutturaComponent } from './add-struttura.component';

describe('AddStrutturaComponent', () => {
  let component: AddStrutturaComponent;
  let fixture: ComponentFixture<AddStrutturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStrutturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStrutturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
