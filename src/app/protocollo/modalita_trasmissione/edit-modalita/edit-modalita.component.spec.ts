import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalitaComponent } from './edit-modalita.component';

describe('EditModalitaComponent', () => {
  let component: EditModalitaComponent;
  let fixture: ComponentFixture<EditModalitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModalitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModalitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
