import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtoAdminComponent } from './proto-admin.component';

describe('ProtoAdminComponent', () => {
  let component: ProtoAdminComponent;
  let fixture: ComponentFixture<ProtoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
