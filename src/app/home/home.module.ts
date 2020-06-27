import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { MessageComponentModule } from '../message/message.module';
import { Camera } from '@ionic-native/camera/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageComponentModule,
    HomePageRoutingModule,
    HttpClientModule
    
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
