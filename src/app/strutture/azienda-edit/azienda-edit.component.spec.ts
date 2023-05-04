import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AziendaEditComponent } from './azienda-edit.component';

describe('AziendaEditComponent', () => {
  let component: AziendaEditComponent;
  let fixture: ComponentFixture<AziendaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AziendaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AziendaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
