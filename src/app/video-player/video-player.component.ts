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

  private count:number = 5
  private startIndex:number = 0
  private screenWidth: number = 720;
  public videoList: Array<Video> = []
  public selectedVideo: number = 0
  public selectedVideoURL: SafeUrl = ""
  private playerObserver: any

  

  constructor(private videoService: VideoServiceService, private sanitizer: DomSanitizer) {     }
    


  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.getVideosToDisplay(this.count)
  }



  getVideosToDisplay(count:number){
    this.videoService.getVideos(this.startIndex,count).subscribe((data: any)=>{
      let videos = data.data
      
      let nVideoList: Array<Video> = []
      for (let video of videos){
  
        let nVideo = new Video(video.contentId, video.contentType, video.thumbnails, video.metadata, video.assets)
        nVideoList.push(nVideo)
      }
      this.videoList = nVideoList
      this.count = this.videoList.length


      this.getVideoSize()      
      // this.handleTimeStamps()
      // if(this.selectedVideo = undefined){
      //   this.selectedVideo = this.videoList[0]
      // }
      // console.log(this.selectedVideo);
      
    })
  }

  getVideoSize(){
    for(let asset of this.videoList[this.selectedVideo].assets){
      if(asset.width > this.screenWidth){
        this.selectedVideoURL = this.sanitizer.bypassSecurityTrustResourceUrl(asset.url)
        console.log(this.selectedVideoURL);

        return
      }
    }
  }

  loadMore() {
    this.getVideosToDisplay(this.count+5)
  }

  changeVideo(contentId:string){
    for(let [index, video] of this.videoList.entries()){
      if(video.contentId === contentId){
        this.selectedVideo = index;
        this.getVideoSize()

        console.log(this.selectedVideo)
        return


        
      }
    }
  }

  nextVideo(){
    console.log(this.selectedVideo);
    
    this.selectedVideo += 1;
    this.changeVideo(this.videoList[this.selectedVideo].contentId)
  }


  @HostListener('window:resize', ['$event'])
    onResize() {
      this.screenWidth = window.innerWidth;
      this.getVideoSize()
    
    
    }

    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
  // handleTimeStamps(){
  //   var replace = "/\r\n/gi"

  //   for (let video of this.videoList){
  //     video.metadata.description = video.metadata.description.replace(replace, "<br>")
  //   }
  // }
  
}
