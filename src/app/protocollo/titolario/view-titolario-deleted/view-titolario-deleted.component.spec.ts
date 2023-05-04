import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTitolarioDeletedComponent } from './view-titolario-deleted.component';

describe('ViewTitolarioDeletedComponent', () => {
  let component: ViewTitolarioDeletedComponent;
  let fixture: ComponentFixture<ViewTitolarioDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTitolarioDeletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTitolarioDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
