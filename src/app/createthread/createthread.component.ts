import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {Threads} from 'models/Threads.js';
import {ThreadService} from '../thread.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SocketService } from '../socket.service';
import { Emails } from 'models/Emails.js';
import {MembersService} from '../members.service'; 
import {Router} from "@angular/router";
import { Comments } from '../model/Comments';
import { CommentsService } from '../comments.service';
import { isNullOrUndefined } from 'util';
import { TopicServiceService } from '../topic-service.service';
@Component({
  selector: 'app-createthread',
  templateUrl: './createthread.component.html',
  styleUrls: ['./createthread.component.css']
})
export class CreatethreadComponent implements OnInit {
  name = 'Angular 6';
  title = '';
  htmlContent = '';
  thread: Threads;
  userName:String;
  room: String;
  email: Emails;
  file:any[]=[];
  nameTopic:String;
  k:Boolean;
  imagethread:String;
  checkedPremission:String;
   image:String;
   position:String;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    // uploadUrl: '/dist/DHKTPM11A-LEVANTRUONG-HOANGMINHTHIEN-NG',
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
     private socket: SocketService,
     public membersService:MembersService,
     public topicService:TopicServiceService,
     private router: Router,
     private commentservice: CommentsService
    
    ) {

      this.userName=localStorage.getItem("sessionusername"); 
      this.checkedPremission=localStorage.getItem("sessionpremission");
      this.socket.reveiverMessageHopThu();
     }
     decodeEntities(str) {
      // this prevents any overhead from creating the object each time
      const element = document.createElement('div');
      if(str && typeof str === 'string') {
          // strip script/html tags
          str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
          str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
          element.innerHTML = str;
          str = element.textContent;
          element.textContent = '';
        }
        return str;
    }
 onSubmited():void{
  var topicName = this.route.snapshot.paramMap.get('name');
     this.nameTopic=topicName;
 
     console.log("111111111111"+this.nameTopic);
     
     if(this.position=="Admin"||this.position=="SubAdmin"){
            this.k=true;
            this.imagethread="./../../assets/img/THONGBAO.jpg";
     }
     else{
       this.k=false;
       this.imagethread="./../../assets/img/hinhforum.png";
     }
     const comment = new Comments();
     comment.content = this.htmlContent;
     const commentList = [];
     commentList.push(comment);
    this.thread =
      {
        threadName: this.title,
        topicName: this.nameTopic,

        numberOfViews: 0,
        numberOfLikes: 0,
        numberOfComments: 0,
        lastUpdateBy:localStorage.getItem("sessionusername") ,
        lastUpdate: new Date(),
        isEvent: false,
        isAuthen: this.k,
        isAnnouncement:this.k,
        deletedBy: localStorage.getItem("sessionusername"),
        createdBy: localStorage.getItem("sessionusername"),
        image:this.image,
        imageThread:this.imagethread,
        commentList: commentList

      }
    this.email =
      {
        topicName: topicName,
        userName: localStorage.getItem("sessionusername"),
        content: "Bài viết của đang chờ tình trạng kiểm duyệt",
        status: false
      }
    if (this.htmlContent != '' && this.title !== '') {
      this.threadService.addThread(this.thread).subscribe(data => {
        if (isNullOrUndefined(data)) {
          this.showError("Lỗi kết nối đến server", null)
        } else {
          const id = +data.threadId;
          const comm =
          {
            threadId:id,
            userName: localStorage.getItem("sessionusername"),
            content: this.htmlContent,
            image: this.image,
            position:this.position,
            numberOfLikes: 0,
            numberOfDislikes:0,
            statusLike:false,
            statusDisLike:false
          }
  
          this.commentservice.addComments(comm).subscribe(x => console.log('Observer got a next value: ' + x),
            err => console.log("success"),
            () => console.log('Observer got a complete notification')
          )
    
          this.showError("Thành công", data);
          }
          this.threadService.addEmail(this.email).subscribe(x => console.log('Observer got a next value: ' + x),
            err => console.log("success"),
            () => console.log('Observer got a complete notification')
          );
        
      });
    } else {
      this.showError("Vui lòng nhập nội dung và tiêu đề", null)
    }
      
 }
 showError(error: string, data: any): void{
  const dialogRef = this.dialog.open(ErrorDialogComponent, {
    data: {errorMsg: error} ,width : '250px'
  });
  if (data !== null) {
    dialogRef.afterClosed().subscribe(res => {
      this.router.navigate(['thread/' + data.threadId]);
    })
  }
}
loadUserName():void{
    if(localStorage.getItem("isLoginSocial")=='true'){
           this.image=localStorage.getItem("image");
           this.position="Member";
    }
    else{
  this.membersService.getMemberByUsername(this.userName).subscribe(data=>{
    data.forEach((item,index)=>{
        this.image=item.image;
        this.position=item.position;
    })
    console.log(this.image);
   });
  }
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
