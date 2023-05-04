import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInboxComponent } from './delete-inbox.component';

describe('DeleteInboxComponent', () => {
  let component: DeleteInboxComponent;
  let fixture: ComponentFixture<DeleteInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
