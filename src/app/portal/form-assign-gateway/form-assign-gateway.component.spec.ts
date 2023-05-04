import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAssignGatewayComponent } from './form-assign-gateway.component';

describe('FormAssignGatewayComponent', () => {
  let component: FormAssignGatewayComponent;
  let fixture: ComponentFixture<FormAssignGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAssignGatewayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAssignGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
