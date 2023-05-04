import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDestinatariDeletedComponent } from './view-destinatari-deleted.component';

describe('ViewDestinatariDeletedComponent', () => {
  let component: ViewDestinatariDeletedComponent;
  let fixture: ComponentFixture<ViewDestinatariDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDestinatariDeletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDestinatariDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
