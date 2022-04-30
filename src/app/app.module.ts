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



@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
