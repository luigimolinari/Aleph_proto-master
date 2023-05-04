import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTitolarioComponent } from './edit-titolario.component';

describe('EditTitolarioComponent', () => {
  let component: EditTitolarioComponent;
  let fixture: ComponentFixture<EditTitolarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTitolarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTitolarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
