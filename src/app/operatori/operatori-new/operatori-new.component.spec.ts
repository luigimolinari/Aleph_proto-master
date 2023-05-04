import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatoriNewComponent } from './operatori-new.component';

describe('OperatoriNewComponent', () => {
  let component: OperatoriNewComponent;
  let fixture: ComponentFixture<OperatoriNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatoriNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatoriNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
