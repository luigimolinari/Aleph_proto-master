import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolliViewComponent } from './protocolli-view.component';

describe('ProtocolliViewComponent', () => {
  let component: ProtocolliViewComponent;
  let fixture: ComponentFixture<ProtocolliViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtocolliViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolliViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
