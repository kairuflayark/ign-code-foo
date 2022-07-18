import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpClientJsonpModule, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Video } from './video.model';




@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {
  private VIDEO_ENDPOINT = "http://localhost:3000/video/"
  private _videoList = new BehaviorSubject<Video[]>([]);
  private videoList: Video[] = []
  
  constructor(private http: HttpClient) { }



  //API call to video endpoint
  loadVideos(startIndex:number, count:number){



    this.http.get<{message:string, videos:Video[]}>(this.VIDEO_ENDPOINT)
      .subscribe((response) =>{
        this.videoList = response.videos
        this._videoList.next(this.videoList)
      },
      (error:any) => { console.log(error);
      })
        
        // then handle the error
    
  }

  //calls the API then processes the object returned into a useful format
  processVideos(startIndex:number, count:number){
    this.loadVideos(startIndex,count)
  }

  addVideo(newVideo:Video){
    if (newVideo == null) {
      return
    }

    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    newVideo.id = ''

    return this.http.post<{ message:string, video: Video}>(this.VIDEO_ENDPOINT, 
    newVideo, headers)
    .subscribe((responseData) => { 
      this.videoList.push(responseData.video)

    })
  
  }
  
  updateVideo(originalVideo: Video, newVideo: Video) {
    if (newVideo == null || originalVideo == null) {
      return
    }
    const pos = this.videoList.findIndex(doc => {return doc.id == originalVideo.id});
    if (pos < 0){
      return
    }

    newVideo.id = originalVideo.id

    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }

    this.http.put(this.VIDEO_ENDPOINT + originalVideo.id, newVideo, headers)
      .subscribe(
        () => {
          this.videoList[pos] = newVideo;
        }
      )

  }


  deleteVideo(video:Video) {
    if (!video) {

      
        return;
    }

    
    const pos = this.videoList.findIndex(doc => {return doc.id == video.id});
    if (pos < 0) {

        return;
    }
    this.http.delete(this.VIDEO_ENDPOINT +video.id)
      .subscribe(() => {
        this.videoList.splice(pos, 1);
      })
  }





  observeVideos(): Observable<Video[]> {
    return this._videoList
  }

  handleError(error:HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
