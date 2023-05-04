import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AziendaViewComponent } from './azienda-view.component';

describe('AziendaViewComponent', () => {
  let component: AziendaViewComponent;
  let fixture: ComponentFixture<AziendaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AziendaViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AziendaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
