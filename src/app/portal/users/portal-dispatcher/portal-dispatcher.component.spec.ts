import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalDispatcherComponent } from './portal-dispatcher.component';

describe('PortalDispatcherComponent', () => {
  let component: PortalDispatcherComponent;
  let fixture: ComponentFixture<PortalDispatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalDispatcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalDispatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
