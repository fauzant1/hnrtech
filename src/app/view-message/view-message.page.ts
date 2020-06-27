import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Message } from '../services/data.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
  public message: Message;
public detailData:any;
  constructor(
    private http : HttpClient,
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.message = this.data.getMessageById(parseInt(id, 10));
    this.http.get(this.data.apiURL+"/"+ parseInt(id, 10)).subscribe(
      (data)=>{
        this.detailData=data;
        
       console.log(this.detailData);
      }
    )
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
