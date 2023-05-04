import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtoScanComponent } from './proto-scan.component';

describe('ProtoScanComponent', () => {
  let component: ProtoScanComponent;
  let fixture: ComponentFixture<ProtoScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtoScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtoScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
