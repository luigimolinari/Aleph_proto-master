import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContattiComponent } from './add-contatti.component';

describe('AddContattiComponent', () => {
  let component: AddContattiComponent;
  let fixture: ComponentFixture<AddContattiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContattiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
