import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamTestComponent } from './webcam-test.component';

describe('WebcamTestComponent', () => {
  let component: WebcamTestComponent;
  let fixture: ComponentFixture<WebcamTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebcamTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
