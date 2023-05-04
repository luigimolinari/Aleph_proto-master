import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinatariEditComponent } from './destinatari-edit.component';

describe('DestinatariEditComponent', () => {
  let component: DestinatariEditComponent;
  let fixture: ComponentFixture<DestinatariEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinatariEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinatariEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
