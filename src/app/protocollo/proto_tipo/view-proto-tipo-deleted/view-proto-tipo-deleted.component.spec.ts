import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProtoTipoDeletedComponent } from './view-proto-tipo-deleted.component';

describe('ViewProtoTipoDeletedComponent', () => {
  let component: ViewProtoTipoDeletedComponent;
  let fixture: ComponentFixture<ViewProtoTipoDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProtoTipoDeletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProtoTipoDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
