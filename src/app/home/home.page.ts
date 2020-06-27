import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DataService, Message } from '../services/data.service';
import { HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { stringify } from 'querystring';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ModalController } from '@ionic/angular';
export class userData {
  id: number;
  email: string;
  first_name:string;
  last_name:string;
  avatar:string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dump:any;
  searchCount:number;
  prevVisible:boolean ;
  nextVisible:boolean;
  pageNumber:number;
  total_pages:number;
   userData:userData[];
   userData1:userData[];
   searchSize:number;
   clickedImage: string;

   options: CameraOptions = {
     quality: 100,
     destinationType: this.camera.DestinationType.DATA_URL,
     encodingType: this.camera.EncodingType.JPEG,
     mediaType: this.camera.MediaType.PICTURE
   }
  constructor(private modalCtrl: ModalController,private vibration: Vibration,private camera: Camera,private data: DataService, private http: HttpClient) {
   
    this.http.get(this.data.apiURL)
  .subscribe(data => {
    this.dump=data;
    this.pageNumber=this.dump.page;
    this.total_pages=this.dump.total_pages;
    this.dump=this.dump.data;
    this.userData=JSON.parse(JSON.stringify(this.dump));
    if(this.pageNumber>=1 && this.pageNumber<this.total_pages){
      this.nextVisible=true;
    }
    if(this.pageNumber>1 && this.pageNumber>=this.total_pages){
      this.prevVisible=true;
    }
    this.searchCount=this.userData.length;
    console.log(this.userData);
  });


  }
  next(){
    if(this.pageNumber>=1 && this.pageNumber<this.total_pages){
      console.log('next');
     
      this.http.get(this.data.apiURL+ '?page='+(++this.pageNumber))
      .subscribe(data => {
        this.dump=data;
        this.dump=this.dump.data;
        this.userData=JSON.parse(JSON.stringify(this.dump));
       
      });
      this.prevVisible=true;
      if(this.pageNumber=this.total_pages){
        this.nextVisible=false;
      }
    }
    else{
      this.nextVisible=false;
    }
  
  }

  prev(){
    if(this.pageNumber>1 && this.pageNumber>=this.total_pages){
      console.log('prev');
      
      this.http.get(this.data.apiURL+ '?page='+(--this.pageNumber))
      .subscribe(data => {
        this.dump=data;
        this.dump=this.dump.data;
        this.userData=JSON.parse(JSON.stringify(this.dump));
       
      });

      this.nextVisible=true;
      if(this.pageNumber==1){
        this.prevVisible=false;
      }
    }
    else{
      this.prevVisible=false;
    }
   
  }

  async filterList(evt) {
  const val = evt.target.value;
   
  if(val=='' || isNullOrUndefined(val) ){
    this.searchSize=6;
  }
  else{
    this.searchSize=12;
  }
  this.http.get(this.data.apiURL+ '?per_page='+this.searchSize)
  .subscribe(data => {
    this.dump=data;
    this.dump=this.dump.data;
    this.userData=JSON.parse(JSON.stringify(this.dump));
    this.userData=  this.userData.filter(s=> (s.first_name.toLowerCase().includes(val.toLowerCase())) || (s.last_name.toLowerCase().includes(val.toLowerCase())));
    this.searchCount=this.userData.length;
    if(this.searchCount==0){
      this.vibration.vibrate(1000);
    }
    console.log(this.userData);
  });

  }

  captureImage() {
    this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
    }, (err) => {
      console.log(err);
    });
  }
}
