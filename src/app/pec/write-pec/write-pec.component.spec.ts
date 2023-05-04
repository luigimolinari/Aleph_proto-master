import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritePecComponent } from './write-pec.component';

describe('WritePecComponent', () => {
  let component: WritePecComponent;
  let fixture: ComponentFixture<WritePecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WritePecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WritePecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
