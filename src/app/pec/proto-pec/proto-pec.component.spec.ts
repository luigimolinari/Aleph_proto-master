import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtoPecComponent } from './proto-pec.component';

describe('ProtoPecComponent', () => {
  let component: ProtoPecComponent;
  let fixture: ComponentFixture<ProtoPecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtoPecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtoPecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
