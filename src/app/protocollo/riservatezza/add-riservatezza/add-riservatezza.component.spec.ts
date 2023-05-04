import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRiservatezzaComponent } from './add-riservatezza.component';

describe('AddRiservatezzaComponent', () => {
  let component: AddRiservatezzaComponent;
  let fixture: ComponentFixture<AddRiservatezzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRiservatezzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRiservatezzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
