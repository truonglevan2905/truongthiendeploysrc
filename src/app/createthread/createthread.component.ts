import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {Threads} from 'models/Threads.js';
import {ThreadService} from '../thread.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Socket } from 'ngx-socket-io';
import { Emails } from 'models/Emails.js';
import {MembersService} from '../members.service'; 


@Component({
  selector: 'app-createthread',
  templateUrl: './createthread.component.html',
  styleUrls: ['./createthread.component.css']
})
export class CreatethreadComponent implements OnInit {
  name = 'Angular 6';
  htmlContent = '';
  thread: Threads;
  userName:String;
  room: String;
  email: Emails;
  file:any[]=[];
  checkedPremission:String;
   image:String;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  constructor(private route: ActivatedRoute,
     public threadService:ThreadService,
     public dialog: MatDialog,
     private socket: Socket,
     public membersService:MembersService
    
    ) {

      this.userName=localStorage.getItem("sessionusername"); 
      this.checkedPremission=localStorage.getItem("sessionpremission");
     }
 onSubmited():void{
  var topicName = this.route.snapshot.paramMap.get('name');

    this.thread =
      {
        threadName: this.htmlContent,
        topicName: topicName,

        numberOfViews: 0,
        numberOfLikes: 0,
        numberOfComments: 0,
        lastUpdateBy:localStorage.getItem("sessionusername") ,
        lastUpdate: "2019-04-21",
        isEvent: false,
        isAuthen: false,
        deletedBy: localStorage.getItem("sessionusername"),
        createdBy: localStorage.getItem("sessionusername"),
        commentList: []

      }
    this.email =
      {
        topicName: topicName,
        userName: localStorage.getItem("sessionusername"),
        content: "Bài viết của đang chờ tình trạng kiểm duyệt",
        status: false
      }
    if (this.htmlContent != '') {
      this.threadService.addThread(this.thread).subscribe(x => console.log('Observer got a next value: ' + x),
        err => console.log("success"),
        () => console.log('Observer got a complete notification')
      );
      this.threadService.addEmail(this.email).subscribe(x => console.log('Observer got a next value: ' + x),
        err => console.log("success"),
        () => console.log('Observer got a complete notification')
      );
      this.threadService.sendMessage({username: "Admin", topicname: topicName, text: this.email.content, ngay: Date.now()});
      this.showError("Thành công");
      this.htmlContent = "";
    }
    else {
      this.showError("Không thành công")
    }
      
 }
 showError(error:String):void{
  this.dialog.open(ErrorDialogComponent, {
    data: {errorMsg: error} ,width : '250px'
  });
}
loadUserName():void{
     
  this.membersService.getMemberByUsername(this.userName).subscribe(data=>{
    data.forEach((item,index)=>{
        this.image=item.image;
    })
    console.log(this.image);
   });

}
ngOnInit() {
  this.name;
  this.config;
  this.htmlContent;
  this.loadUserName();
}
logout():void{
  window.localStorage.clear();
  location.reload(true);

 
  }

}
