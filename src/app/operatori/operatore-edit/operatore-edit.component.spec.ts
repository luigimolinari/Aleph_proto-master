import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatoreEditComponent } from './operatore-edit.component';

describe('OperatoreEditComponent', () => {
  let component: OperatoreEditComponent;
  let fixture: ComponentFixture<OperatoreEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatoreEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatoreEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
