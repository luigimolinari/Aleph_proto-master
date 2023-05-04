import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProtocolloComponent } from './add-protocollo.component';

describe('AddProtocolloComponent', () => {
  let component: AddProtocolloComponent;
  let fixture: ComponentFixture<AddProtocolloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProtocolloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProtocolloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
