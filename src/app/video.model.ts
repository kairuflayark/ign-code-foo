

// the structure of the video data. 
export class Video{
    id:string;
    title:string;
    artist:string;
    url:string;
    constructor(
        id:string, 
        title:string,
        artist:string,
        url:string){ 
            this.id = id,
            this.title = title,
            this.artist = artist,
            this.url = url
            }
}
