import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoConfComponent } from './video-conf.component';

describe('VideoConfComponent', () => {
  let component: VideoConfComponent;
  let fixture: ComponentFixture<VideoConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoConfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
