import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestImapComponent } from './test-imap.component';

describe('TestImapComponent', () => {
  let component: TestImapComponent;
  let fixture: ComponentFixture<TestImapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestImapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestImapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
