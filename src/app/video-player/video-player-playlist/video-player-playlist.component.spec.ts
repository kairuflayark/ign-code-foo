import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerPlaylistComponent } from './video-player-playlist.component';

describe('VideoPlayerPlaylistComponent', () => {
  let component: VideoPlayerPlaylistComponent;
  let fixture: ComponentFixture<VideoPlayerPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoPlayerPlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayerPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
