import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProceduraComponent } from './add-procedura.component';

describe('AddProceduraComponent', () => {
  let component: AddProceduraComponent;
  let fixture: ComponentFixture<AddProceduraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProceduraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProceduraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
