import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDestinatariComponent } from './view-destinatari.component';

describe('ViewDestinatariComponent', () => {
  let component: ViewDestinatariComponent;
  let fixture: ComponentFixture<ViewDestinatariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDestinatariComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDestinatariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
