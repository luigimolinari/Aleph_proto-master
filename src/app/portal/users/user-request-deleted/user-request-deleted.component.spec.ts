import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestDeletedComponent } from './user-request-deleted.component';

describe('UserRequestDeletedComponent', () => {
  let component: UserRequestDeletedComponent;
  let fixture: ComponentFixture<UserRequestDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRequestDeletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
