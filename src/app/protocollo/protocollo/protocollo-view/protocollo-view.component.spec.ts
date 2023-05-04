import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolloViewComponent } from './protocollo-view.component';

describe('ProtocolloViewComponent', () => {
  let component: ProtocolloViewComponent;
  let fixture: ComponentFixture<ProtocolloViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtocolloViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolloViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
