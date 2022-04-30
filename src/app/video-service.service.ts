import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpClientJsonpModule} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Video } from './video-list.model';


@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {
  private VIDEO_ENDPOINT = "https://ign-apis.herokuapp.com/videos"
  

  constructor(private http: HttpClient) { }


  // createVideoSubscriber(){
  //   const videoList = new Observable((observer) => {

  //   })
  // }

  getVideos(startIndex:number, count:number): Observable<any> {

      const getVideoURL = `${this.VIDEO_ENDPOINT}?startIndex=${startIndex}&count=${count}`;
      console.log(getVideoURL);

    
      return this.http.jsonp(getVideoURL, 'callback')
      .pipe(
        catchError(this.handleError) // then handle the error
    );
  }


  // processVideos(startIndex:number, count:number) {

  //  return this.getVideos(startIndex,count).subscribe((data: any)=>{
  //     console.log(data);
  //     let videos = data.data
  //     console.log(videos);
      
  //     let nVideoList: Array<Video> = []
  //     for (let video of videos){
  
  //       let nVideo = new Video(video.contentId, video.contentType, video.thumbnails, video.metadata, video.assets)
  //       nVideoList.push(nVideo)
  //     }
  //     return nVideoList
  //   })
  // }

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
