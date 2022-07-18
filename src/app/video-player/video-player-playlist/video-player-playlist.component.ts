import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-video-player-playlist',
  templateUrl: './video-player-playlist.component.html',
  styleUrls: ['./video-player-playlist.component.css']
})
export class VideoPlayerPlaylistComponent implements OnInit {


  @Input('contentId') contentId!: string;
  @Input('thumbnailURL') thumbnailURL!: string;
  @Input('title') title!: string;

  @Output() changeVideo:EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  clickVideo(){
    this.changeVideo.emit(this.contentId)
  }

  onRemoveItem(){
    
  }
}
