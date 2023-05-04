import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestViewComponent } from './user-request-view.component';

describe('UserRequestViewComponent', () => {
  let component: UserRequestViewComponent;
  let fixture: ComponentFixture<UserRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRequestViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
