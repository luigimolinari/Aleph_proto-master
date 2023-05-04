import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalFormComponent } from './portal-form.component';

describe('PortalFormComponent', () => {
  let component: PortalFormComponent;
  let fixture: ComponentFixture<PortalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
