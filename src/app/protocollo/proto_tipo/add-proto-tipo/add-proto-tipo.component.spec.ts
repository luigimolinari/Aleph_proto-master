import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProtoTipoComponent } from './add-proto-tipo.component';

describe('AddProtoTipoComponent', () => {
  let component: AddProtoTipoComponent;
  let fixture: ComponentFixture<AddProtoTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProtoTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProtoTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
