import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Video } from '../video-list.model';
import { VideoServiceService } from '../video-service.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  private count:number = 5;
  private startIndex:number = 0;
  private screenWidth: number = 720;
  public videoList: Video[] = [];
  public selectedVideo: number = 0;
  public selectedVideoURL: SafeUrl = "";
  public selectedVideoThumbnail:SafeUrl = "";


  constructor(private videoService: VideoServiceService, private sanitizer: DomSanitizer) {     }
    
  //initializes the system
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.videoService.observeVideos().subscribe((videoList) => {
      this.videoList = videoList      
      this.count = this.videoList.length
      this.getVideoURL(this.selectedVideo)      
    })
    this.getVideosToDisplay(this.count + 5)
  }


  //Begins the API call to get the Videos
  getVideosToDisplay(count:number){
    this.videoService.processVideos(this.startIndex, count)
  }

  //uses the ScreenWidth to get the closest video to the screen size to minimise bandwith, but still look good at full screen.
  getVideoURL(index:number){
    this.selectedVideo = index;
    // makes sure that there is a default URL to link to. It is assuming that the last url is the largest one
    let unsanitizedVideoURL = this.videoList[this.selectedVideo].assets[this.videoList[this.selectedVideo].assets.length -1].url

    for(let asset of this.videoList[this.selectedVideo].assets){
      
      if(asset.width > (this.screenWidth * .7) ){ 
        unsanitizedVideoURL = asset.url
      } 
    }
    // I hate this, but I need it to avoid the CORS errors. Seems to be the only way to get arround it
    this.selectedVideoURL = this.sanitizer.bypassSecurityTrustResourceUrl(unsanitizedVideoURL)
    //gets the largest thumbnail for use as the still image of the video
    this.selectedVideoThumbnail = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.videoList[this.selectedVideo].thumbnails[this.videoList[this.selectedVideo].thumbnails.length - 1].url)
  }

  //Load more videos, nuff said
  loadMore() {
    this.getVideosToDisplay(this.count+5)
  }

  //changes the video to the one the user selected from the playlist
  changeVideo(contentId:string){
    for(let [index, video] of this.videoList.entries()){
      if(video.contentId === contentId){
        this.getVideoURL(index)
        return
      }
    }
  }

  nextVideo(){
    this.selectedVideo += 1;
    this.changeVideo(this.videoList[this.selectedVideo].contentId)
  }

  // listens to the window and has the video resize if necessary
  @HostListener('window:resize', ['$event'])
    onResize() {
      this.screenWidth = window.innerWidth;
      this.getVideoURL(this.selectedVideo)
    
    
    }

}
