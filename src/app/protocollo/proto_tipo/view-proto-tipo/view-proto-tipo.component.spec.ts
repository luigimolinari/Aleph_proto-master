import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProtoTipoComponent } from './view-proto-tipo.component';

describe('ViewProtoTipoComponent', () => {
  let component: ViewProtoTipoComponent;
  let fixture: ComponentFixture<ViewProtoTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProtoTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProtoTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
