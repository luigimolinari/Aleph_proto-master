import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGatewayAssignComponent } from './form-gateway-assign.component';

describe('FormGatewayAssignComponent', () => {
  let component: FormGatewayAssignComponent;
  let fixture: ComponentFixture<FormGatewayAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGatewayAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGatewayAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
