import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerVideoBoxComponent } from './video-player-video-box.component';

describe('VideoPlayerVideoBoxComponent', () => {
  let component: VideoPlayerVideoBoxComponent;
  let fixture: ComponentFixture<VideoPlayerVideoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoPlayerVideoBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayerVideoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
