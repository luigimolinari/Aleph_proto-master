import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRiservatezzaComponent } from './edit-riservatezza.component';

describe('EditRiservatezzaComponent', () => {
  let component: EditRiservatezzaComponent;
  let fixture: ComponentFixture<EditRiservatezzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRiservatezzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRiservatezzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
