import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAziendaComponent } from './add-azienda.component';

describe('AddAziendaComponent', () => {
  let component: AddAziendaComponent;
  let fixture: ComponentFixture<AddAziendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAziendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAziendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
