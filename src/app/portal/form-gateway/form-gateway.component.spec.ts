import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGatewayComponent } from './form-gateway.component';

describe('FormGatewayComponent', () => {
  let component: FormGatewayComponent;
  let fixture: ComponentFixture<FormGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGatewayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
