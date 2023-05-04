import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtoCloniComponent } from './proto-cloni.component';

describe('ProtoCloniComponent', () => {
  let component: ProtoCloniComponent;
  let fixture: ComponentFixture<ProtoCloniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtoCloniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtoCloniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
