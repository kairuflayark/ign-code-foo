import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { VideoServiceService } from 'src/app/video-service.service';
import { Video } from 'src/app/video.model';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {

  @Input('currentVideo') videoId!: number
  video:Video = new Video("0","", "", "")
  edit:boolean = false
  mTitle:string = "Add Video"
  modalRef!: BsModalRef
  constructor(public bsModalRef: BsModalRef, private videoService:VideoServiceService) { }

  ngOnInit(): void {
  }
 
  onSubmit(form:NgForm){
    console.log(form);
    let values = form.value
    let newVideo = new Video('0', values.title, values.artist, values.url)
    console.log(this.video);
    
    console.log(newVideo);
    

    if(this.edit == true){
      this.videoService.updateVideo(this.video, newVideo)
    } else {
      this.videoService.addVideo(newVideo)
    }





    this.bsModalRef.hide()
  }
}
