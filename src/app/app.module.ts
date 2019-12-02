import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { ReservaPageModule } from './reserva_turnos/reserva/reserva.module';
import { ReservaListPageModule } from './reserva_turnos/reserva-list/reserva-list.module';
import { ReservaCreatePageModule } from './reserva_turnos/reserva-create/reserva-create.module';

import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReservaPageModule,
    ReservaListPageModule,
    ReservaCreatePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    FileChooser,
    FilePath,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
