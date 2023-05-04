import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTitolarioComponent } from './add-titolario.component';

describe('AddTitolarioComponent', () => {
  let component: AddTitolarioComponent;
  let fixture: ComponentFixture<AddTitolarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTitolarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTitolarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
