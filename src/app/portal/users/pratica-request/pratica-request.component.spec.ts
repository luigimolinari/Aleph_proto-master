import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraticaRequestComponent } from './pratica-request.component';

describe('PraticaRequestComponent', () => {
  let component: PraticaRequestComponent;
  let fixture: ComponentFixture<PraticaRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PraticaRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PraticaRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
