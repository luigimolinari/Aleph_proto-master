import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInboxDeletedComponent } from './view-inbox-deleted.component';

describe('ViewInboxDeletedComponent', () => {
  let component: ViewInboxDeletedComponent;
  let fixture: ComponentFixture<ViewInboxDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInboxDeletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInboxDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
