import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModalitaComponent } from './add-modalita.component';

describe('AddModalitaComponent', () => {
  let component: AddModalitaComponent;
  let fixture: ComponentFixture<AddModalitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModalitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModalitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
