import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { Video } from '../video.model';
import { VideoServiceService } from '../video-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { VideoEditComponent } from './video-edit/video-edit.component';

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
  public edit: boolean = false
  modalRef!: BsModalRef


  constructor(private videoService: VideoServiceService, private sanitizer: DomSanitizer,
    private modalService:BsModalService) {     }
    
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
    let unsanitizedVideoURL = this.videoList[this.selectedVideo].url
    // I hate this, but I need it to avoid the CORS errors. Seems to be the only way to get arround it
    this.selectedVideoURL = this.sanitizer.bypassSecurityTrustResourceUrl(unsanitizedVideoURL)
    //gets the largest thumbnail for use as the still image of the video
    
  }

  //Load more videos, nuff said
  loadMore() {
    this.getVideosToDisplay(this.count+5)
  }

  //changes the video to the one the user selected from the playlist
  changeVideo(contentId:string){
    for(let [index, video] of this.videoList.entries()){
      if(video.id === contentId){
        this.getVideoURL(index)
        return
      }
    }
  }

  addVideo(){
    this.modalRef = this.modalService.show(VideoEditComponent)
    this.modalRef.content.edit = false
    this.modalRef.content.closeBtnName = 'Add Video';
  }

  editVideo(){
    this.modalRef = this.modalService.show(VideoEditComponent)
    this.modalRef.content.video = this.videoList[this.selectedVideo]
    this.modalRef.content.edit = true
    this.modalRef.content.title = 'Edit Video';
  }

  onRemoveItem(){
    this.videoService.deleteVideo(this.videoList[this.selectedVideo])
  }

  nextVideo(){
    this.selectedVideo += 1;
    this.changeVideo(this.videoList[this.selectedVideo].id)
  }

  // listens to the window and has the video resize if necessary
  @HostListener('window:resize', ['$event'])
    onResize() {
      this.screenWidth = window.innerWidth;
      this.getVideoURL(this.selectedVideo)
    
    
    }

}
