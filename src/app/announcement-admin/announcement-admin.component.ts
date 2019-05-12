import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TopicDetailService} from '../topic-detail.service';
import {Threads} from 'models/Threads';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {MembersService} from '../members.service'; 
import { CommentsService } from '../comments.service';
import { Comments } from '../model/Comments';
import { SocketService } from '../socket.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Router} from "@angular/router";
@Component({
  selector: 'app-announcement-admin',
  templateUrl: './announcement-admin.component.html',
  styleUrls: ['./announcement-admin.component.css']
})
export class AnnouncementAdminComponent implements OnInit {
    listThread:Threads[]=[];
    name = 'Angular 6';
    comments: Comments[] = [];
    isCheck: boolean;
    comm: Comments;
    time:Date;
    messageArray: Array<{ threadid: Number, user: String, message: String }> = [];
  messageArray1: Array<{ threadid: Number, user: String, message: String }> = [];
    userName:String;
    htmlContent = '';
    checkedPremission:String;
    image:String;
    position:String;
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
  constructor(  private route: ActivatedRoute,
                private topicdetailService:TopicDetailService,
                private membersService:MembersService, 
                private commentservice: CommentsService,
                public dialog: MatDialog,
                public socketService: SocketService
    ) { 
      
      this.userName=localStorage.getItem("sessionusername"); 
     
      this.checkedPremission=localStorage.getItem("sessionpremission");
      this.socketService.joinRoomAnnounceAdmin(this.route.snapshot.paramMap.get('threadId'));
      this.socketService.newMessageReceived1().subscribe(data => {
        this.messageArray.push(data);
       this.messageArray1= this.messageArray.reverse();
  
      });
    }
  getAllAnnounce(){
    var id=+this.route.snapshot.paramMap.get('threadId');
    this.topicdetailService.getAllThreadById(id).subscribe(data=>{
    this.listThread=data;
    });

  }
  getAllCommentByThreadID(): void {
    const id = +this.route.snapshot.paramMap.get('threadId');
    console.log("Comments" + id);
    this.commentservice.getAllByCommnetByThreadID(id).subscribe(data => this.comments = data);
  }
  onselect(a: boolean): void {
    this.isCheck = a;
  }
  loadUserName():void{
     
    this.membersService.getMemberByUsername(this.userName).subscribe(data=>{
      data.forEach((item,index)=>{
          this.image=item.image;
          this.position=item.position;
          
          this.time=new Date();
      })
     
     });
  
  }
  createCommit(): void {
    if (this.htmlContent != "") {
      const id = +this.route.snapshot.paramMap.get('threadId');
      this.comm =
        {
          threadId:id,
          userName: localStorage.getItem("sessionusername"),
          content: this.htmlContent,
           image:this.image,
           position:this.position,
          numberOfLikes: 0,
          numberOfDislikes:0,
          statusLike:false,
          statusDisLike:false
        }

      this.commentservice.addComments(this.comm).subscribe(x => console.log('Observer got a next value: ' + x),
        err => console.log("success"),
        () => console.log('Observer got a complete notification')
      )
     this.socketService.sendMessage1({ threadid: this.route.snapshot.paramMap.get('threadId'), username: localStorage.getItem("sessionusername"), content: this.htmlContent });
      this.showError("Thành công");


      this.htmlContent = '';
    }
    else {
      this.showError("Bạn chưa nhập vào field.");

    }
  }
  ngOnInit() {
    this.name;
  this.config;
  this.htmlContent; 
  this.loadUserName(); 
  this.getAllCommentByThreadID();
  }
  showError(error: String): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: error }, width: '250px'
    });
  }
  logout():void{
    window.localStorage.clear();
    location.reload(true);
  
   
    }
}
