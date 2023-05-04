import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneScrivaniaComponent } from './gestione-scrivania.component';

describe('GestioneScrivaniaComponent', () => {
  let component: GestioneScrivaniaComponent;
  let fixture: ComponentFixture<GestioneScrivaniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestioneScrivaniaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneScrivaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
