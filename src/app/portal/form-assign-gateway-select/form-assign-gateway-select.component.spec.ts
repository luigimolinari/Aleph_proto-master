import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAssignGatewaySelectComponent } from './form-assign-gateway-select.component';

describe('FormAssignGatewaySelectComponent', () => {
  let component: FormAssignGatewaySelectComponent;
  let fixture: ComponentFixture<FormAssignGatewaySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAssignGatewaySelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAssignGatewaySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
