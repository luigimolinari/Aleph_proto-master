import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInboxComponent } from './view-inbox.component';

describe('ViewInboxComponent', () => {
  let component: ViewInboxComponent;
  let fixture: ComponentFixture<ViewInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
