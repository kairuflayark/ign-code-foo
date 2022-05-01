import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpClientJsonpModule} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Video } from './video-list.model';



@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {
  private VIDEO_ENDPOINT = "https://ign-apis.herokuapp.com/videos"
  private _videoList = new BehaviorSubject<Video[]>([]);
  private videoList: Video[] = []
  
  constructor(private http: HttpClient) { }



  //API call to video endpoint
  loadVideos(startIndex:number, count:number): Observable<any> {
      const getVideoURL = `${this.VIDEO_ENDPOINT}?startIndex=${startIndex}&count=${count}`;


      return this.http.jsonp(getVideoURL, 'callback')
      .pipe(
        catchError(this.handleError) // then handle the error
    );
  }

  //calls the API then processes the object returned into a useful format
  processVideos(startIndex:number, count:number){
    this.videoList = []
    this.loadVideos(startIndex,count).subscribe((data: any)=>{

      let videos = data.data

      
      let nVideoList: Array<Video> = []
      for (let video of videos){
  
        let nVideo = new Video(video.contentId, video.contentType, video.thumbnails, video.metadata, video.assets)
        this.videoList.push(nVideo)
      }
      this._videoList.next(this.videoList)
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
