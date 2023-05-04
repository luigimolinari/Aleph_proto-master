import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelliEditComponent } from './modelli-edit.component';

describe('ModelliEditComponent', () => {
  let component: ModelliEditComponent;
  let fixture: ComponentFixture<ModelliEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelliEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelliEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
