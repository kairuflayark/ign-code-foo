import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';

import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoPlayerPlaylistComponent } from './video-player/video-player-playlist/video-player-playlist.component';
import { VideoPlayerVideoBoxComponent } from './video-player/video-player-video-box/video-player-video-box.component';
import { VideoEditComponent } from './video-player/video-edit/video-edit.component';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalModule } from 'ngx-bootstrap/modal';





@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    VideoPlayerPlaylistComponent,
    VideoPlayerVideoBoxComponent,
    VideoEditComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    FormsModule,
    MatDialogModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
