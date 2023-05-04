import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProtoTipoComponent } from './edit-proto-tipo.component';

describe('EditProtoTipoComponent', () => {
  let component: EditProtoTipoComponent;
  let fixture: ComponentFixture<EditProtoTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProtoTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProtoTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
