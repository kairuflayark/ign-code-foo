import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { VgApiService } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'app-video-player-video-box',
  templateUrl: './video-player-video-box.component.html',
  styleUrls: ['./video-player-video-box.component.css']
})
export class VideoPlayerVideoBoxComponent implements OnInit {
  @Input("thumbnailURL") thumbnailURL!:SafeUrl;
  @Input("videoURL") videoURL!:SafeUrl;
  @Input("title") title!:string;
  @Input("artist") artist!:string;

  @Output() nextVideo:EventEmitter<Boolean> = new EventEmitter();

  api!: VgApiService;
  autoplay: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;

    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
          // Set the video to the beginning
          this.nextVideo.emit(true)
          this.autoplay = true
      }
    );
  }
  


}
