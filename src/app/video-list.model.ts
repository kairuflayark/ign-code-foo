export class Video{
    public contentId:string = "";
    public contentType:string = "";
    public thumbnails: Array<Thumbnail> = [];
    public metadata: Metadata = {
        title: "",
        description: ""
    };
    public assets: Array<Asset> = []

    constructor(
        contentId:string, 
        contentType:string,
        thumbnails?: Array<Thumbnail>,
        metadata?: Metadata,
        assets?: Array<Asset>){

            this.contentId = contentId;
            this.contentType = contentType;
            if(thumbnails) this.thumbnails = thumbnails;
            if(metadata) this.metadata = metadata;
            if(assets) this.assets = assets

        }
}

export interface Thumbnail {
    url: string,
    size: string,
    width:number,
    height:number
}

export interface Metadata{
    title: string,
    description: string,
}

export interface Asset{
    url:string,
    height:number,
    width:number
}